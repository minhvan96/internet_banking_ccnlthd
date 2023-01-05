export const convertCurrentcy = (data) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data);
}