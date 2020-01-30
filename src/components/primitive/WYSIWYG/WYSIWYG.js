import React, { Component } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../../../utils/MyUploadAdapter';
import { image } from '../../../http/tming';

class Wysiwyg extends Component {
  state = {
    body: '',
    media: []
  };

  static defaultProps = {
    body: ''
  };

  componentDidMount() {
    this.initCkeditor();
  }

  initCkeditor = () => {
    try {
      /*Replace textarea with classic editor*/
      ClassicEditor.create(document.querySelector('#ckeditor'), {
        extraPlugins: [MyUploadAdapter]
      })
        .then(editor => {
          editor.setData(this.props.body);

          editor.plugins.get('FileRepository').createUploadAdapter = loader => {
            // Configure the URL to the upload script in your back-end here!
            return new MyUploadAdapter(loader, {
              ok: file => {
                const { media } = this.state;
                media.push(file);

                this.setState({
                  ...this.state,
                  media
                });
              },
              fail: e => {
                alert(e);
              }
            });
          };
          this.setState({
            ...this.state,
            editor
          });
        })
        .catch(error => {
          console.log(error);
          console.log('Error in Classic Editor Create ' + error);
        });
    } catch (error) {
      console.log('Error in  InitializeCKeditor ' + error);
    }
  };

  getBody = () => {
    const { media, editor } = this.state;
    const usedMedia = [];

    let body = editor.getData();

    media.forEach((data, index) => {
      Object.keys(data).forEach(blob => {
        const extension = data[blob].name.split('.').pop();
        const replaced = body.replace(blob, image(`${index}.${extension}`));
        if (replaced !== body) {
          body = body.replace(blob, image(`${index}.${extension}`));
          usedMedia.push(data[blob]);
        }
      });
    });

    return {
      body,
      media: usedMedia
    };
  };

  render() {
    return <div id={'ckeditor'} />;
  }
}

export default Wysiwyg;
