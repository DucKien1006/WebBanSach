export default function formatCurrencyVi(price) {
    const formatObject = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return formatObject.format(price);
}