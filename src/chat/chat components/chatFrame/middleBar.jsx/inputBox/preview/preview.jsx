import React from 'react'
import { MdOutlineCancel } from "react-icons/md";

export default function PreviewImage({previewimg,setInputData}) {

    function ClearImgInput() {
		setInputData((values) => {
			return { ...values, type: "", text: "", disableInput: false };
		});
	}
    return (
        <div className="preview-image ">
            <div className="d-flex justify-content-end p-2 w-100" onClick={ClearImgInput}>
                
                    
                <MdOutlineCancel/>
                
                </div>
            <div className="d-flex align-items-center justify-content-center">
                <img src={previewimg} height="120" style={{objectFit:"cover"}} width="180px" alt="" />
            </div>
        </div>
    )
}
