import './ProductForm.scss';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaProduct } from '../../../schemas/productShemas';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, editProduct, fetchProductById } from '../../../features/products/productActions';
import { ToastContainer, toast } from 'react-toastify';
import AtomLoading from '../../../compoents/atoms/AtomLoading/AtomLoading';

const ProductForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { loading, error, message } = useSelector((state) => state.products);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: zodResolver(schemaProduct),
        defaultValues: {
            // image_url: "https://product.hstatic.net/200000568629/product/vuong_79cbbc33ca52467e8d967561b28a723e.jpg",
            // : "67a7368e44fa3b260f4f05a2",

            title: "",
            price_default: 0,
            categoryId: "",
            description: "",
            image_url: "",
            stock_default: 1,
            rate: 0,
            isHidden: false,
            attributes: [],
        },
    });


    useEffect(() => {
        if (id) {
            (async () => {
                const data = await dispatch(fetchProductById(id)).unwrap();
                reset(data);
            })();
        }
    }, [dispatch, id, reset]);

    useEffect(() => {
        return () => {
            dispatch({ type: 'products/clearState',  });
        };
    }, []);

    function handleProductForm(dataBody) {
        try {
            if (id) {
                dispatch(editProduct({ id, ...dataBody }));
                toast.success(message || 'Update success!');
                setTimeout(() => {
                    nav('/admin/products');
                }, 2000);
            } else {
                dispatch(createProduct(dataBody));
                toast.success(message || 'Add success!');
                // reset();
            }
        } catch (error) {
            console.log('handleProductForm error', error);
        }
    }

    if (error) {
        if (typeof error === 'string') {
            toast.error(error);
        } else {
            toast.error(error || 'An error occurred');
        }
    }

    function handleResetForm() {
        reset({
            title: '',
            price: 0,
            description: '',
        });
    }

    // Thêm ảnh sản phẩm
    const [image, setImage] = useState(null);
    const [errorImage, setError] = useState("");


    const handleDrop = (event) => {
        event.preventDefault();
        setError("");

        const file = event.dataTransfer.files[0];
        handleFile(file);
    };

    const handleFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
        setError("Vui lòng chọn một tệp ảnh hợp lệ!");
        return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
        setImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInput = (event) => {
        const file = event.target.files[0];
        handleFile(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const removeImage = () => {
        setImage(null);
    };

    return (
        <div className='product-form-page'>
            <h1>{id ? 'Cập nhật' : 'Thêm mới'} sản phẩm</h1>

            {loading && <AtomLoading />}

            <form onSubmit={handleSubmit(handleProductForm)} className='product-form'>
                {/* 0 Image */}
                <div className="image-upload-container">
                    <div
                        className="drop-zone"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {image ? (
                        <div className="image-preview">
                            <img src={image} alt="Uploaded" />
                            <button className="remove-btn" onClick={removeImage}>
                            Xóa ảnh
                            </button>
                        </div>
                        ) : (
                        <>
                            <p>Kéo & Thả ảnh vào đây hoặc</p>
                            <input type="file" accept="image/*" onChange={handleFileInput} />
                        </>
                        )}
                    </div>
                    {errorImage && <p className="error-text">{errorImage}</p>}
                </div>
                {/* 1 Title */}
                <div className='form-group mt-2'>
                    <label htmlFor='title' className='form-label'>
                        Title
                    </label>
                    <input
                        className='form-control'
                        type='text'
                        id='title'
                        placeholder='Title'
                        {...register('title', { required: true })}
                    />
                    {errors.title && <p className='text-danger'>{errors.title?.message}</p>}
                </div>
                {/* 2 Price default */}
                <div className='form-group mt-2'>
                    <label htmlFor='price_default' className='form-label'>
                    Price default
                    </label>
                    <input
                        className='form-control'
                        type='number'
                        id='price_default'
                        placeholder='Price default'
                        step='any'
                        {...register('price_default', { required: true, valueAsNumber: true })}
                    />
                    {errors.price && <p className='text-danger'>{errors.price?.message}</p>}
                </div>
                {/* 3 Description */}
                <div className='form-group mt-2'>
                    <label htmlFor='description' className='form-label'>
                        Description
                    </label>
                    <textarea
                        className='form-control'
                        id='description'
                        cols="50"
                        placeholder='Description'
                        {...register('description', { required: true })}
                    />
                </div>
                {/* stock_default */}
                <div className='form-group mt-2'>
                    <label htmlFor='stock_default' className='form-label'>
                    Stock default
                    </label>
                    <input
                        className='form-control'
                        type='number'
                        id='stock_default'
                        placeholder='Stock default'
                        step='any'
                        {...register('stock_default', { required: true, valueAsNumber: true })}
                    />
                    {errors.price && <p className='text-danger'>{errors.price?.message}</p>}
                </div>
                {/* Thêm danh mục */}
                <div className="form-group mt-2">
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <select
                        className="form-control"
                        id="category"
                        {...register("categoryId", { required: true })}
                    >
                        <option value="">Chọn danh mục</option>
                        <option value="full-range">Full Range</option>
                        <option value="67a7368e44fa3b260f4f05a2">Subwoofer</option>
                        <option value="microphones">Microphones</option>
                        <option value="amplifier">Amplifier</option>
                        <option value="mixers">Mixer Digital</option>
                    </select>
                    {errors.categoryId && <p className='text-danger'>{errors.categoryId?.message}</p>}

                </div>
                {/* Thêm biến thể */}

                {/* Action isHidden */}
                <div className='product-form-action form-group mt-2'>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={handleResetForm}
                    >
                        Nhập lại
                    </button>
                    <button type='submit' className='btn btn-primary'>
                        {id ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>

            </form>
            <ToastContainer />
        </div>
    );
};

export default ProductForm;
