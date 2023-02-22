import { Button, Col, Row } from "antd";
import React, { useContext, useState } from "react";
import ImageUploading, { ImageListType } from 'react-images-uploading';
import {UploadOutlined} from '@ant-design/icons';
import axios from "axios";
import AppContext from "@/context/context";

const Settings: React.FC = () => {
    const [images, setImages] = useState([]);
    const {password,login} = useContext(AppContext)
    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
        axios.post(`${import.meta.env.VITE_API_URL}/avatar`,{name : login,password : password,image : Buffer.from(imageList[0].dataURL!).toString("base64")}).then(({data}) => console.log(data))
    };
    return (
        <Row>
            <Col span={24}><h1>Cambia tu avatar</h1>
                <ImageUploading
                    value={images}
                    onChange={onChange}
                    maxNumber={1}
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps
                    }) => (<div className="upload__image-wrapper">
                        <Button
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        ><UploadOutlined size={40} />
                            Haz click o arrastra la imagen
                        </Button>
                    </div>
                    )}
                </ImageUploading>
            </Col>
            <Col>
            </Col>
        </Row>
    )
}

export default Settings