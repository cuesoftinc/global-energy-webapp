import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/interceptor";
import styles from "./Viewpost.module.scss"
import { useQuery } from "react-query";
import { BlogPost } from "../../../../types";
import { useState } from "react";
import toast from "react-hot-toast";
import image1 from "../../../../../public/assets/image1.svg"
import { backIcon } from "../../../../../public/assets";



const ViewPost = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate()
    const [singlePost, setSinglePost] = useState<BlogPost | null>(null)

    const getSinglePost = async (id: string) => {
        if (!id) throw new Error("Post ID is required");
        const response = await api.get(`/post/${id}`);
        return response.data;
    };

    useQuery(['getSinglePost', id], async () => {
        if (!id) throw new Error("Post ID is required");
        return getSinglePost(id);
    }, {
        onSuccess: (data) => {
            setSinglePost(data);
        },
        onError: () => {
            toast.error('Error fetching post');
        }
    });


    return (
        <div className={styles.main}>
            <div className={styles.backDiv}>
                <img src={backIcon} alt="back icon" />
                <p onClick={() => navigate(-1)} className={styles.back}>Back</p>
            </div>
            <div className={styles.pattern}></div>
            <div className={styles.secondGlow}>
                <div className={styles.glow}></div>
            </div>
            <div className={styles.container}>
                <div>
                    <p className={styles.date}> {singlePost?.createdAt
                        ? new Date(singlePost.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                        : "Date not available"}.</p>
                    <hr />
                </div>
                <div className={styles.textImg}>
                    <div>
                        <p className={styles.title}>{singlePost?.title}</p>
                        <p className={styles.subTitle}>{singlePost?.subTitle}</p>
                    </div>
                    <div className={styles.imgDiv}>
                        <img className={styles.img} src={image1} alt="blog" />
                    </div>
                    <p className={styles.updated}><span className={styles.updatedSpan}>Updated:</span> {singlePost?.updatedAt
                        ? new Date(singlePost.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                        : "Date not available"}..</p>
                </div>
                <p className={styles.content}>{singlePost?.content}</p>
            </div>
        </div>
    );
};

export default ViewPost;
