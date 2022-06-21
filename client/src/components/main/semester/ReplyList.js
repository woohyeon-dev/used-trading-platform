import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Context from '../../../context/Context';
import callApi from '../../../utils/callApi';
import timeForToday from '../../../utils/timeForToday';
import { ReplyCreate, ReplyUpdate } from './../../index';

const ReplyListBlock = styled.div`
  .total {
    margin: 20px 0 20px 5px;
    font-size: 20px;
  }
`;

const Reply = styled.div`
  padding: 15px 18px;
  margin: 15px 0;
  border: 1px solid lightgrey;
  display: grid;
  grid-template-columns: 7fr 1fr;
  grid-gap: 5px;

  .replyInfo {
    line-height: 30px;
    font-size: 15px;
  }

  .nickname {
    font-weight: bold;
  }

  .content {
    font-size: 17px;
    grid-column: 1 / span 2;
  }

  .time {
    text-align: right;
    color: grey;
  }

  .buttonGroup {
    grid-column: 2 / span 1;
    display: flex;
    justify-content: right;
    align-items: flex-end;
    font-size: 16px;
    color: grey;
  }

  .button {
    line-height: 30px;
    &:hover {
      cursor: pointer;
    }
  }

  .deleteBtn {
    margin-left: 10px;
    color: #b71d1d;
  }
`;

function ReplyList({ replies, setUpdate }) {
  const { loggedUser } = useContext(Context);
  const [editReplyId, setEditReplyId] = useState('');

  const handleEditBtn = e => {
    const reply_id = e.target.id;
    setEditReplyId(reply_id);
  };

  const handleDeleteBtn = async e => {
    const reply_id = e.target.id;
    setUpdate(true);
    await callApi('delete', '/semester/delete', { params: { reply_id } });
    setUpdate(false);
  };

  return (
    <ReplyListBlock>
      <ReplyCreate setUpdate={setUpdate} />
      <div className='total'>총 댓글 수: {replies.length}</div>
      {replies.length > 0 &&
        replies.map((reply, index) => (
          <div key={index}>
            <Reply>
              <div className='nickname replyInfo'>
                {reply.nickname} ({reply.user_id})
              </div>
              <div className='time replyInfo'>
                {timeForToday(reply.regdate)}
              </div>
              <div className='content replyInfo'>{reply.content}</div>
              {loggedUser.id === reply.writer && (
                <div className='buttonGroup'>
                  <div
                    className='button'
                    id={reply.reply_id}
                    onClick={handleEditBtn}
                  >
                    수정
                  </div>
                  <div
                    className='button deleteBtn'
                    id={reply.reply_id}
                    onClick={handleDeleteBtn}
                  >
                    삭제
                  </div>
                </div>
              )}
            </Reply>
            {editReplyId === `${reply.reply_id}` && (
              <ReplyUpdate
                replyId={reply.reply_id}
                beforeContent={reply.content}
                setEditReplyId={setEditReplyId}
                setUpdate={setUpdate}
              />
            )}
          </div>
        ))}
    </ReplyListBlock>
  );
}

export default ReplyList;
