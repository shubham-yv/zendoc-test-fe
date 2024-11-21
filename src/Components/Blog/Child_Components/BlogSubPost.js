import React from 'react'
import BlogFooter from './BlogFooter'
import Image from '../../../style/images/AdobeStock_162759589.png'

const BlogSubFeed2 = () => {
    return (
        <>
            <div className='Blog-Post-Container'>
                <div className="blog-video-container">
                    {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/y2BGLd0siy8?si=9WYHBdoAh-p3XGRw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                    <img src={Image} alt="Image" className='mt-4'/>
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