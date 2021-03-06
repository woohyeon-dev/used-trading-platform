import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import defaultImage from '../image/default.png';
import callApi from '../utils/callApi';
import CATEGORIES from '../utils/categories';

const CreateProductBlock = styled.div`
  width: 1024px;
  padding: 30px 30px 70px 30px;
  font-size: 20px;

  .pageTitle {
    font-size: 30px;
    line-height: 100px;
    font-weight: bold;
    text-align: center;
    border-bottom: 2px solid black;
  }

  .inputBox {
    display: flex;
    margin-top: 40px;
    padding: 0 20px;
  }

  .inputTitle {
    font-size: 22px;
    width: 170px;
    line-height: 50px;
  }

  input {
    width: 704px;
    padding: 17px;
    font-size: 16px;
    font-family: 'GyeonggiBatang';
    border: 1px solid lightgrey;
    border-radius: 3px;

    &:hover,
    &:focus {
      outline: 1px solid black;
    }
  }

  .titleCharCnt {
    width: 50px;
    text-align: right;
    line-height: 51px;
    height: 50px;
  }

  .bottomLine {
    height: 40px;
    border-bottom: 1px solid lightgrey;
  }

  .imageUpload {
    width: 181px;
    height: 180px;
    border: 1px solid lightgrey;
    border-radius: 3px;

    &:hover,
    &:focus {
      outline: 1px solid black;
    }
  }

  .imgPreview {
    width: 181px;
    height: 180px;
    margin-left: 10px;
    border: 1px solid lightgrey;
    border-radius: 3px;
  }

  select {
    font-family: 'GyeonggiBatang';
    border: 1px solid lightgrey;
    color: grey;
    border-radius: 3px;
    width: 150px;
    padding: 10px;
    font-size: 16px;

    &:hover,
    &:focus {
      outline: 1px solid black;
    }
  }

  .textareaBox {
    display: flex;
    margin-top: 40px;
  }

  .priceInput {
    width: 250px;
  }

  .won {
    width: 34px;
    text-align: right;
    font-size: 20px;
    line-height: 50px;
  }

  textarea {
    font-family: 'GyeonggiBatang';
    font-size: 16px;
    width: 754px;
    height: 250px;
    line-height: 30px;
    padding: 15px;
    resize: none;
    border: 1px solid lightgrey;
    border-radius: 3px;

    &:hover,
    &:focus {
      outline: 1px solid black;
    }
  }

  .descriptCharCnt {
    text-align: right;
    padding: 10px 22px 0 0;
  }

  .writePostBtnGroup {
    display: flex;
    justify-content: right;
    padding: 0 20px;
  }

  button {
    font-family: 'GyeonggiBatang';
    padding: 12px;
    font-size: 18px;
    background-color: white;
    font-weight: bold;
    margin-top: 30px;

    &:hover {
      cursor: pointer;
    }
  }

  .backToList {
    text-decoration: none;
    color: black;
  }

  .writeBtn {
    background-color: green;
    color: white;
    margin-left: 30px;
  }
`;

function CreateProduct() {
  //url ????????? ?????? useNavigate
  const navigate = useNavigate();
  const imageInput = useRef();
  const [postInfo, setPostInfo] = useState({
    title: '',
    cat_id: '1',
    price: '',
    descript: '',
  });
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: '',
  });
  const [titleCnt, setTitleCnt] = useState(0);
  const [descriptCnt, setDescriptCnt] = useState(0);

  const { title, descript, cat_id, price } = postInfo;

  // input??? ???????????? ??????????????? setPostInfo??? ??????
  const handleInputs = e => {
    const { value, name } = e.target; // ?????? e.target ?????? name ??? value ??? ??????
    if (value.length > 40 && name === 'title') {
      return;
    } else if (value.length > 100 && name === 'descript') {
      return;
    }
    setPostInfo({
      ...postInfo, // ????????? input ????????? ????????? ???
      [name]: value, // name ?????? ?????? ?????? value ??? ??????
    });
  };

  useEffect(() => {
    setTitleCnt(title.length);
  }, [title]);

  useEffect(() => {
    setDescriptCnt(descript.length);
  }, [descript]);

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const onChangeImageInput = e => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('descript', descript);
      formData.append('cat_id', cat_id);
      formData.append('price', price);
      formData.append('image', image.image_file);
      callApi('post', '/market/create', formData);
      //???????????? ?????? url??? ??????
      navigate('/market');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CreateProductBlock>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className='pageTitle'> ?????? ?????? ????????? ??????</div>
        <div className='inputBox'>
          <div className='inputTitle'>??????</div>
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleInputs}
            placeholder='?????? ????????? ??????????????????'
          />
          <div className='titleCharCnt'>{titleCnt}/40</div>
        </div>
        <div className='bottomLine'></div>

        {/* ????????? */}
        <div className='inputBox'>
          <div className='inputTitle'>?????????</div>
          <input
            type='file'
            style={{ display: 'none' }}
            ref={imageInput}
            accept='image/*'
            required
            onChange={onChangeImageInput}
          />
          <div>
            <img
              alt=''
              src={defaultImage}
              className='imageUpload'
              onClick={onClickImageUpload}
            ></img>
          </div>
          {image.preview_URL !== '' ? (
            <img alt='' src={image.preview_URL} className='imgPreview'></img>
          ) : null}
        </div>
        <div className='bottomLine'></div>

        {/* ???????????? */}
        <div className='inputBox'>
          <div className='inputTitle'>????????????</div>
          <select name='cat_id' onChange={handleInputs}>
            {CATEGORIES.map((category, index) => (
              <option value={index + 1} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className='bottomLine'></div>

        <div className='inputBox'>
          <div className='inputTitle'>??????</div>
          <input
            className='priceInput'
            type='number'
            name='price'
            value={price}
            onChange={handleInputs}
            placeholder='????????? ??????????????????'
          />
          <div className='won'>???</div>
        </div>
        <div className='bottomLine'></div>

        <div className='inputBox'>
          <div className='inputTitle'>??????</div>
          <textarea
            name='descript'
            placeholder='?????? ????????? ??????????????????'
            value={descript}
            onChange={handleInputs}
          />
        </div>
        <div className='descriptCharCnt'>{descriptCnt}/100</div>
        <div className='bottomLine'></div>

        <div className='writePostBtnGroup'>
          <button>
            <NavLink to='/market' className='backToList'>
              ????????????
            </NavLink>
          </button>
          <button className='writeBtn' type='submit'>
            ????????????
          </button>
        </div>
      </form>
    </CreateProductBlock>
  );
}

export default CreateProduct;
