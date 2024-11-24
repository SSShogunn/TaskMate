import Skeleton from 'react-loading-skeleton'

const SkeletonTask = () => {
    return (
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
            <div className="flex items-center space-x-4">
                <Skeleton circle width={16} height={16} />
                <div className="flex-1">
                    <Skeleton width="60%" height={24} />
                    <Skeleton width="80%" height={20} className="mt-1" />
                    <Skeleton width="30%" height={16} className="mt-2" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonTask; 