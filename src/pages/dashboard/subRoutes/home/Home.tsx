import styles from "./Home.module.scss"
import image1 from "../../../../../public/assets/image1.svg"
import { Link } from "react-router-dom";
import { trash } from "../../../../../public/assets";


const Home = () => {

    return (
        <main className={styles.main}>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Search for posts..."
                    value=""
                    onChange={()=> {}}
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
                        <Link to="/dashboard/view-post" className={styles.btn}>View Post</Link>
                        <div className={styles.iconDiv}>
                            <img src={trash} alt="trash icon" />
                    
                        </div>
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
                        <div className={styles.iconDiv}>
                            <img src={trash} alt="trash icon" />
                          
                        </div>
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
                        <div className={styles.iconDiv}>
                            <img src={trash} alt="trash icon" />
                            
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;
