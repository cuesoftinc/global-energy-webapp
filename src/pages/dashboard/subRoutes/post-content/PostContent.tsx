import { useCallback, useEffect, useState } from "react";
import Button from "../../../../components/button/Button"
import Input from "../../../../components/input/Input"
import styles from "./PostContent.module.scss"
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../../utils/interceptor";
import LoadingScreen from "../../../../components/loadingScreen/LoadingScreen";


interface updateProps {
    postId: string
    title?: string;
    subTitle?: string;
    content?: string;
}

const PostContent = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const queryClient = useQueryClient();
    const [disabled, setDisabled] = useState(true)
    const navigate = useNavigate()


    // Fetch the post data when in update mode
    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                const response = await api.get(`/post/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
                setSubTitle(response.data.subTitle);
                setImage(null);
            };
            fetchPost();
        }
    }, [id]);

    const updatePost = async ({ postId, title, subTitle, content }: updateProps) => {
        const response = await api.patch(`/post/${postId}`, {
            title,
            subTitle,
            content,
        });
        return response.data;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const postContent = async () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('subTitle', subTitle)
        formData.append('content', content)

        if (image) {
            formData.append('img', image);
        }

        const response = await api.post(`/post`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data
    }

    const { mutate: createpost, isLoading } = useMutation(postContent, {
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries("getBlogPost")
                toast.success("post created sucessfully")
                setTitle('')
                setSubTitle('')
                setContent('')
                setImage(null)
                navigate("/dashboard")
            }
        },
        onError: (error: any) => {
            toast.error(error.message)
        }
    })

    const { mutate: update, isLoading: loading } = useMutation(updatePost, {
        onSuccess: () => {
            queryClient.invalidateQueries("getBlogPost")
            toast.success("Post updated successfully")
            setTitle('')
            setSubTitle('')
            setContent('')
            setImage(null)
            navigate("/dashboard")
        },
        onError: () => {
            toast.error("Error updating post")
        },
    });


    // Handle Form Submission (Create or Update)
    const handleSendPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (id) {
            const updatedData = {
                postId: id as string,
                title,
                subTitle,
                content,
            };
            update(updatedData);
        } else {
            createpost();
        }
    }

    const handleDisableButton = useCallback(() => {
        if (!id) {
            setDisabled(!(title.length > 0 && content.length > 0 && image !== null));
        } else {
            setDisabled(false);
        }
    }, [title, content, image, id]);

    useEffect(() => {
        handleDisableButton()
    }, [handleDisableButton])

    return (
        <main className={styles.main}>
            <LoadingScreen style={{ width: "100%" }} overlay={id ? loading : isLoading} overlayText={id ? 'Updating blog post...' : 'Creating blog post...'} />
            <p className={styles.title}>Enter the details of the post</p>
            <form onSubmit={handleSendPost} className={styles.formContent}>
                <Input
                    value={title}
                    id="title"
                    type="text"
                    label="Title"
                    placeholder="Enter Post title"
                    alt={false}
                    showFilter={false}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    value={subTitle}
                    id="subTitle"
                    type="text"
                    label="Sub-title"
                    placeholder="Give context about the title"
                    alt={false}
                    showFilter={false}
                    onChange={(e) => setSubTitle(e.target.value)}
                />
                <div className={styles.inputDiv}>
                    <label htmlFor="contentDetail" className={styles.label}>Content Detail</label>
                    <textarea className={styles.select}
                        name="contentDetail"
                        id="contentDetail"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        cols={30} rows={10}
                    ></textarea>
                </div>
                {!id && (
                    <div className={styles.inputDiv}>
                        <label htmlFor="imageUpload" className={styles.label}>Upload Image</label>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*" // Only accept image files
                            onChange={handleImageChange}
                        />
                    </div>
                )}
                <Button
                    type="submit"
                    isLoading={false}
                    disabled={disabled}
                    className={styles.button}
                >
                    {id ? "Update Post" : "Send Post"}
                </Button>
            </form>
        </main>
    )
}

export default PostContent