import React from 'react'
import '../../../style/Blog/BlogPost.css'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ClearIcon from '@mui/icons-material/Clear';

const BlogFooter = () => {
    return (
        <>
            <div className="blog-img-horizontal-line"></div>
            <div className='blog-footer-container'>
                <div>
                    <span style={{ marginRight: '.6rem' }}>
                        <RemoveRedEyeOutlinedIcon />
                    </span>
                    View
                </div>
                <div className='blog-footer-container-sub'>
                    <div>
                        <span style={{ marginRight: '.6rem' }}>

                            <ShareIcon />
                        </span>
                        Share</div>
                    <div >
                        <span style={{ marginRight: '.6rem' }}>

                            <ClearIcon />
                        </span>
                        Delete</div>
                </div>
            </div>
        </>
    )
}

export default BlogFooter