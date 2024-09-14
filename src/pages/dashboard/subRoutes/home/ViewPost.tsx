import { useParams } from "react-router-dom";
import api from "../../../../utils/interceptor";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import styles from "./Viewpost.module.scss";

interface PostDetails {
    _id: string;
    title: string;
    subTitle: string;
    content: string;
    imgUrl: string;
    createdAt: string;
}

const ViewPost = () => {
    const { id } = useParams<{ id: string }>();

    const getPostById = async (id: string) => {
        const response = await api.get(`/post/${id}`);
        console.log(response.data.data)
        return response.data.data;
    };


    return (
        <div className={styles.container}>
            view
        </div>
    );
};

export default ViewPost;
