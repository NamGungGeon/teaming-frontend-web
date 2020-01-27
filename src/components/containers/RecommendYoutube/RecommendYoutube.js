import React, {Component, useEffect, useState} from 'react';
import Section from "../../primitive/Section/Section";
import Tooltip from "@material-ui/core/Tooltip";
import ImageView from "../../primitive/ImageView/ImageView";

const RecommendYoutube= ()=> {
  const [youtubers, setYoutubers]= useState(null);
  useEffect(()=>{
    setYoutubers([
      {
        name: '윾튺버',
        profile: 'https://i.ytimg.com/vi/hxKDQcW5c9Q/maxresdefault.jpg',
        link: '',
      },
      {
        name: '윾튺버',
        profile: 'https://i.ytimg.com/vi/hxKDQcW5c9Q/maxresdefault.jpg',
        link: '',
      },
      {
        name: '윾튺버',
        profile: 'https://i.ytimg.com/vi/hxKDQcW5c9Q/maxresdefault.jpg',
        link: '',
      },
    ]);
  }, []);

  return (
    <Section>
      <Tooltip
        title={'test'}>
        <h6>추천 유튜브</h6>
      </Tooltip>
      <br/>
      {
        youtubers &&
          youtubers.map(youtuber=>{
            return (
              <Tooltip
                title={youtuber.name}>
                <img
                  onClick={()=>{
                    if(youtuber.link)
                      window.open(youtuber.link);
                  }}
                  style={{
                    cursor: 'pointer',
                    width: '100%',
                    marginBottom: '8px',
                  }}
                  src={youtuber.profile}
                />
              </Tooltip>
            )
          })
      }
    </Section>
    );
}

export default RecommendYoutube;