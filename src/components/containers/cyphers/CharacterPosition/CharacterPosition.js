import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import ImageView from "../../../primitive/ImageView/ImageView";
import {myRes, openApiRes} from "../../../../http/cyphers";
import CardContent from "@material-ui/core/CardContent";
import styles from './CharacterPosition.module.css';


const CharacterPosition= ({position})=>{
  return (
    <div>
      {
        position && (
          <div>
            <h6>포지션 통계</h6>
            <p className={'explain'}>
              {position.analyzedDate}
            </p>
            <div className={styles.wrapper}>
              {
                position.result.map((position, idx)=>{
                  if(idx>= 3)
                    return;
                  return (
                    <Card style={{
                      boxShadow: 'none'
                    }}>
                      <CardHeader
                        style={{
                          padding: 0,
                          paddingBottom: '16px',
                        }}
                        avatar={
                          <Avatar aria-label="recipe">
                            <ImageView img={myRes.getPositionIcon(position.position)}/>
                          </Avatar>
                        }
                        title={position.position}
                        subheader={`승률 ${(position.winRate*100).toFixed(2)}% (${position.count}회 플레이)`}
                      />
                      <CardContent
                        style={{
                          padding: 0,
                        }}>
                        <div>
                          <ImageView img={openApiRes.getPositionIcon(position.lv1)}/>
                          &nbsp;&nbsp;&nbsp;
                          <ImageView img={openApiRes.getPositionIcon(position.lv2)}/>
                          &nbsp;&nbsp;&nbsp;
                          <ImageView img={openApiRes.getPositionIcon(position.lv3)}/>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              }
            </div>
          </div>
        )
      }
    </div>
  )
};

export default CharacterPosition;