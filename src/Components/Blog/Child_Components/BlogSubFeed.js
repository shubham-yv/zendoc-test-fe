import React from 'react';
import '../../../style/Blog/BlogPost.css'
import BlogFooter from './BlogFooter';

const BlogSubFeed = () => {
    return (
        <div className="blog-sub-feed-container">
            <div className="blog-Heading">
                <p><b>
                    Researchers at the University of Otago in New Zealand found that people who eat more raw fruits and
                    vegetables experience less depressive symptoms, a higher positive mood, and greater life
                    satisfaction
                </b></p>
            </div>
            <div className="blog-content">
                <p>Researchers at the University of Otago in New Zealand found that people who eat more raw fruits and
                    vegetables experience less depressive symptoms, a higher positive mood, and greater life
                    satisfaction. The key word here is raw; the researchers found that people who eat more processed
                    fruits and vegetables (cooked or canned) than is typical showed some improvement in positive mood,
                    but did not experience less depression or greater life satisfaction. Some ideas for how we can do
                    this:</p>
            </div>
            <BlogFooter/>
        </div>
    );
};

export default BlogSubFeed;
