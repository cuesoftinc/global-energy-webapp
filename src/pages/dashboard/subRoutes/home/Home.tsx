import styles from "./Home.module.scss"
import image1 from "../../../../../public/assets/image.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import { getAuthRequest } from "../../../../utils/apiClient";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { blogPost } from "../../../../types";


const Home = () => {
    const [posts, setPosts] = useState<blogPost[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const getBlogPost = async () => {
        const base = import.meta.env.VITE_BASE_URL;
        const url = `${base}/api/v2/post`;
        const response = await getAuthRequest(url);
        return response
    }
    useQuery("getBlogPost", getBlogPost, {
        onSuccess: (data) => {
            setPosts(data.data)
        },
        onError: () => {
            toast.error("error fetching data")
        }
    })

    console.log(posts)
    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

//     return (
//         <main className={styles.main}>
//             <div className={styles.inputContainer}>
//                 <input
//                     type="text"
//                     placeholder="Search for posts..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className={styles.input}
//                 />
//             </div>
//             <div className={styles.blogContainer}>
//                 {filteredPosts.length > 0 ? (
//                     filteredPosts.map((post) => (
//                         <div key={post.id} className={styles.blogDiv}>
//                             <div>
//                                 <div className={styles.imageContainer}>
//                                     <img src={post.imgUrl} alt="Blog Post Image" />
//                                 </div>
//                                 <div className={styles.contentDiv}>
//                                     <div className={styles.dateContainer}>
//                                         <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</p>
//                                     </div>
//                                     <div className={styles.titleContainer}>
//                                         <p className={styles.title}>{post.title}</p>
//                                         <p className={styles.subtitle}>Sub Title of the post for more info about the title</p>
//                                     </div>
//                                     <div className={styles.postContainer}>
//                                         <p className={styles.postContent}>{post.content}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className={styles.linkDiv}>
//                                 <Link to="" className={styles.btn}>View Post</Link>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No posts available</p>
//                 )}
//             </div>
//         </main>
//     )
// }


    return (
        <main className={styles.main}>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Search for posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.input}
                />
            </div>
            <div className={styles.blogContainer}>
                <div className={styles.blogDiv}>
                    <div>
                        <div className={styles.imageContainer}>
                            <img src={image1} alt="Blog Post Image" />
                        </div>
                        <div className={styles.contentDiv}>
                            <div className={styles.dateContainer}>
                                <p className={styles.date}>12/09/2024</p>
                            </div>
                            <div className={styles.titleContainer}>
                                <p className={styles.title}>Title of post</p>
                                <p className={styles.subtitle}>Sub Title of the post for more info about the title</p>
                            </div>
                            <div className={styles.postContainer}>
                                <p className={styles.postContent}>Post content goes here, a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content....</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.linkDiv}>
                        <Link to="" className={styles.btn}>View Post</Link>
                    </div>
                </div>
                <div className={styles.blogDiv}>
                    <div>
                        <div className={styles.imageContainer}>
                            <img src={image1} alt="Blog Post Image" />
                        </div>
                        <div className={styles.contentDiv}>
                            <div className={styles.dateContainer}>
                                <p className={styles.date}>12/09/2024</p>
                            </div>
                            <div className={styles.titleContainer}>
                                <p className={styles.title}>Title of post</p>
                                <p className={styles.subtitle}>Sub Title of the post for more info about the title</p>
                            </div>
                            <div className={styles.postContainer}>
                                <p className={styles.postContent}>Post content goes here, a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content....</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.linkDiv}>
                        <Link to="" className={styles.btn}>View Post</Link>
                    </div>
                </div>
                <div className={styles.blogDiv}>
                    <div>
                        <div className={styles.imageContainer}>
                            <img src={image1} alt="Blog Post Image" />
                        </div>
                        <div className={styles.contentDiv}>
                            <div className={styles.dateContainer}>
                                <p className={styles.date}>12/09/2024</p>
                            </div>
                            <div className={styles.titleContainer}>
                                <p className={styles.title}>Title of post</p>
                                <p className={styles.subtitle}>Sub Title of the post for more info about the title</p>
                            </div>
                            <div className={styles.postContainer}>
                                <p className={styles.postContent}>Post content goes here, a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content....</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.linkDiv}>
                        <Link to="" className={styles.btn}>View Post</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;
