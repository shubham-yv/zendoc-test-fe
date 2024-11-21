import React from 'react'
import Image from '../../../style/images/AdobeStock_162759583.png'
import ImageSecond from '../../../style/images/AdobeStock_285511786.png'
import BlogFooter from './BlogFooter'

const BlogSubFeed2 = () => {
    return (
        <>
            <div className='Blog-Post-Container'>
                <div className="blog-Heading">
                    <p><b>
                        Researchers at the University of Otago in New Zealand found that people who eat more raw fruits and
                        vegetables experience less depressive symptoms, a higher positive mood, and greater life
                        satisfaction
                    </b></p>
                </div>
                <div className="blog-img-container">
                    <img src={Image} alt="Image 1" className='mt-4'/>
                    <img src={ImageSecond} alt="Image 2" />
                </div>
                <div className="blog-content">
                    <p>Researchers at the University of Otago in New Zealand found that people who eat more raw fruits and
                        vegetables experience less depressive symptoms, a higher positive mood, and greater life
                        satisfaction. The key word here is raw; the researchers found that people who eat more processed
                        fruits and vegetables (cooked or canned) than is typical showed some improvement in positive mood,
                        but did not experience less depression or greater life satisfaction.</p>
                </div>
                <BlogFooter />
            </div>
        </>
    )
}

export default BlogSubFeed2