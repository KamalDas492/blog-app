import { Link } from "react-router-dom"
import "./Post.css"

export default function Post({post}) {
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };
  const PF = "http://localhost:8000/Images/"
  return (
    <div className = "post">
        {!post.photo &&
          <img 
            className="postImg"
            src =  "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            alt = "post_img"
          />
        }
        {post.photo && 
        <img 
            className="postImg"
            src = {PF + post.photo}
            alt = "post_img"
        />
        }
        <div className="postInfo">
                {post.category && <div className="postCat">
                <div className = "postCatWrap">{post.category}</div>
                </div> }
                <div className="postDate">{new Date(post.createdAt).toDateString()}</div>
        </div>
        <div className="postInfo">
          <Link to={`/posts/${post._id}`} style={linkStyle}>
          <span className="postTitle">{post.title}</span>
          </Link>
        </div>
        <p className="postDesc">
          {post.description}
        </p>
        
    </div>
  )
}
