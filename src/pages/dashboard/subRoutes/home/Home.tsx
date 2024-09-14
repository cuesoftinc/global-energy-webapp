import styles from "./Home.module.scss"
// import image1 from "../../../../../public/assets/image1.svg"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { BlogPost } from "../../../../types";
import { edit, trash } from "../../../../../public/assets";
import api from "../../../../utils/interceptor";


const Home = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const queryClient = useQueryClient();
    const nav = useNavigate()


    const getBlogPost = async () => {
        const response = await api.get("/post")
        return response.data.data
    }
    useQuery("getBlogPost", getBlogPost, {
        onSuccess: (data) => {
            setPosts(data);
        },
        onError: () => {
            toast.error("error fetching data")
        }
    })

    const deletePost = async (postId: string) => {
        await api.delete(`/post/${postId}`)
    };
    const mutation = useMutation(deletePost, {
        onSuccess: (_, postId) => {
            queryClient.invalidateQueries("getBlogPost");
            toast.success(`Post ${postId} deleted successfully`);
        },
        onError: () => {
            toast.error("Error deleting post");
        },
    });

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleViewNavigation = (id: string) => {
        nav(`/dashboard/view-post/${id}`)
    }

    const handleUpdateNavigation = (id: string) => {
        nav(`/dashboard/members-post/${id}`);
    };


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
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div key={post._id} className={styles.blogDiv}>
                            <div>
                                <div className={styles.imageContainer}>
                                    <img src={post.imgUrl} alt="Blog Post Image" />
                                </div>
                                <div className={styles.contentDiv}>
                                    <div className={styles.dateContainer}>
                                        <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className={styles.titleContainer}>
                                        <p className={styles.title}>{post.title}</p>
                                        <p className={styles.subtitle}>Sub Title of the post for more info about the title</p>
                                    </div>
                                    <div className={styles.postContainer}>
                                        <p className={styles.postContent}>{post.content}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.btnDiv}>
                                <button
                                    className={styles.btn}
                                    onClick={() => handleViewNavigation(post._id)}
                                >
                                    View Post
                                </button>
                                <div className={styles.iconDiv}>
                                    <img onClick={() => mutation.mutate(post._id)} src={trash} alt="trash icon" />
                                    <img onClick={() => handleUpdateNavigation(post._id)} src={edit} alt="edit icon" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </main>
    )
}


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
//                 <div className={styles.blogDiv}>
//                     <div>
//                         <div className={styles.imageContainer}>
//                             <img src={image1} alt="Blog Post Image" />
//                         </div>
//                         <div className={styles.contentDiv}>
//                             <div className={styles.dateContainer}>
//                                 <p className={styles.date}>12/09/2024</p>
//                             </div>
//                             <div className={styles.titleContainer}>
//                                 <p className={styles.title}>Title of post</p>
//                                 <p className={styles.subtitle}>Sub Title of the post for more info about the title</p>
//                             </div>
//                             <div className={styles.postContainer}>
//                                 <p className={styles.postContent}>Post content goes here, a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content....</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.linkDiv}>
//                         <Link to="/dashboard/view-post" className={styles.btn}>View Post</Link>
//                         <div className={styles.iconDiv}>
//                             <img src={trash} alt="trash icon" />
//                             {/* <img src={edit} alt="edit icon" /> */}
//                         </div>
//                     </div>
//                 </div>
//                 <div className={styles.blogDiv}>
//                     <div>
//                         <div className={styles.imageContainer}>
//                             <img src={image1} alt="Blog Post Image" />
//                         </div>
//                         <div className={styles.contentDiv}>
//                             <div className={styles.dateContainer}>
//                                 <p className={styles.date}>12/09/2024</p>
//                             </div>
//                             <div className={styles.titleContainer}>
//                                 <p className={styles.title}>Title of post</p>
//                                 <p className={styles.subtitle}>Sub Title of the post for more info about the title</p>
//                             </div>
//                             <div className={styles.postContainer}>
//                                 <p className={styles.postContent}>Post content goes here, a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content....</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.linkDiv}>
//                         <Link to="" className={styles.btn}>View Post</Link>
//                         <div className={styles.iconDiv}>
//                             <img src={trash} alt="trash icon" />
//                             {/* <img src={edit} alt="edit icon" /> */}
//                         </div>
//                     </div>
//                 </div>
//                 <div className={styles.blogDiv}>
//                     <div>
//                         <div className={styles.imageContainer}>
//                             <img src={image1} alt="Blog Post Image" />
//                         </div>
//                         <div className={styles.contentDiv}>
//                             <div className={styles.dateContainer}>
//                                 <p className={styles.date}>12/09/2024</p>
//                             </div>
//                             <div className={styles.titleContainer}>
//                                 <p className={styles.title}>Title of post</p>
//                                 <p className={styles.subtitle}>Sub Title of the post for more info about the title</p>
//                             </div>
//                             <div className={styles.postContainer}>
//                                 <p className={styles.postContent}>Post content goes here, a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content....</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.linkDiv}>
//                         <Link to="" className={styles.btn}>View Post</Link>
//                         <div className={styles.iconDiv}>
//                             <img src={trash} alt="trash icon" />
//                             {/* <img src={edit} alt="edit icon" /> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     )
// }

export default Home;
