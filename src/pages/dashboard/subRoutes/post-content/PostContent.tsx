import { useState } from "react";
import Button from "../../../../components/button/Button"
import Input from "../../../../components/input/Input"
import styles from "./PostContent.module.scss"
import { FormDataPostRequest } from "../../../../utils/apiClient";
import { useMutation } from "react-query";
import toast from "react-hot-toast";


const PostContent = () => {
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const postContent = async () => {
        const base = import.meta.env.VITE_BASE_URL;
        const url = `${base}/api/v2/post`;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subTitle', subTitle);
        formData.append('content', content);
        formData.append('content', content);

        if (image) {
            formData.append('img', image);
        }

        const response = FormDataPostRequest(url, formData)
        return response
    }

    const { mutate } = useMutation(postContent, {
        onSuccess: (data) => {
            if (data.response.status === 200) {
                toast.success("post created sucessfully")
            }
        },
        onError: (error: any) => {
            toast.error(error.message)
        }
    })

    const handleSendPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent form reload
		mutate();
    }


    return (
        <main className={styles.main}>
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
                <div className={styles.inputDiv}>
                    <label htmlFor="imageUpload" className={styles.label}>Upload Image</label>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*" // Only accept image files
                        onChange={handleImageChange}
                    />
                </div>
                <Button
                    type="submit"
                    isLoading={false}
                    disabled={false}
                    className={styles.button}
                >
                    Send Post
                </Button>
            </form>
        </main>
    )
}

export default PostContent