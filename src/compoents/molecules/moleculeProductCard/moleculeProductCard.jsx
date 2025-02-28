import PropTypes from 'prop-types';
import { formatPrice } from '../../../utils/money';
import Skeleton from '@mui/material/Skeleton';

const MoleculeProductCard = ({ item, handleGetDetailById }) => {
	console.log('MoleculeProductCard item: ', item);
	return (
		<>
			{item ? (
				<div className="product-card-item border rounded-lg shadow-sm ">
					<div
						className={` image-container relative aspect-w-1 aspect-h-1`}
					>
						<img
							src={ item?.image_url || '/images/default-featured-image.jpg' }
							alt={item?.title || ''}
							className={`${ !item && 'image-container-skeleton' } object-cover w-full h-full rounded`}
							onClick={() => 	handleGetDetailById(item?.id ?? item?._id) 	}
						/>
					</div>

					<div className="p-2">
						<div
							className="mt-2 text-sm font-semibold product-card-item-name"
							onClick={() => handleGetDetailById(item?.id)}
						>
							{item?.title}
						</div>
						<div className="text-red-500 font-bold text-lg mt-1">
							{Number(item?.price_default) === 0
								? 'Liên hệ'
								: formatPrice(item?.price_default, 'VND')}
						</div>
						<button className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded flex items-center justify-center space-x-1">
							<i className="bi bi-cart" />
							<span>Thêm vào giỏ</span>
						</button>
					</div>
				</div>
			) : (
				<Skeleton variant="rectangular" width={210} height={118} />
			)}
		</>
	);
};

MoleculeProductCard.propTypes = {
	item: PropTypes.object.isRequired,
	handleGetDetailById: PropTypes.func.isRequired
};

export default MoleculeProductCard;
