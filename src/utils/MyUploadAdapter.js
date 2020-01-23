class MyUploadAdapter {
  //listener structure
  // listener= {
  //   ok: (file)=>{
  //
  //   },
  //   fail: (e)=>{
  //
  //   },
  // }

  constructor( loader, listener ) {
    // The file loader instance to use during the upload.
    this.loader = loader;
    this.listener= listener;
  }

  // Starts the upload process.
  upload() {
    const {loader, listener}= this;


    return new Promise(((resolve, reject) => {
      if(loader || listener){
        loader.file.then(response=>{
          console.log('file', response);
          const blob= window.URL.createObjectURL(response);

          //key is object path
          //value is file object,
          const image= {
            [blob]: response
          };

          listener.ok(image);
          resolve({
            default: blob,
          });
        });
      }
      else
        reject("loader or file is not exist");
    }));
  }

  // Aborts the upload process.
  abort() {
  }
}

export default MyUploadAdapter;