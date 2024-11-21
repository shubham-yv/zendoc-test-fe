import React, { useState } from 'react';
import '../../../style/Blog/Blog.css'

const BlogFeed = () => {
    const [content, setContent] = useState('');

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    return (
        <>
            <div className="blog-feed">

                <div className="vlog-section">
                    <textarea
                        className="vlog-textarea"
                        placeholder="Write your feed"
                        value={content}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="blog-horizontal-line"></div>
                <div className='blog-footer-section'>
                    <div className='blog-footer-section-1'>
                        <select className="blog-fontsize">
                            <option value="12">12</option>
                            <option value="16" selected>16</option>
                            <option value="20">20</option>
                            <option value="24">24</option>
                        </select>
                        <div>  <i className="blog-icon fas fa-bold fa-xs"></i></div>
                        <div>   <i className="blog-icon fas fa-italic fa-xs"></i></div>
                        <div><i className="blog-icon far fa-image" ></i></div>



                    </div>
                    <div>

                        <button className="blog-button" type="button">Post</button>
                    </div>

                </div>


            </div>
        </>
    )
}

export default BlogFeed