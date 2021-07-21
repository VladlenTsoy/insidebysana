export const getBase64 = (img: Blob, callback: { (imageUrl: any): void; (arg0: string | ArrayBuffer | null): void; }) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}