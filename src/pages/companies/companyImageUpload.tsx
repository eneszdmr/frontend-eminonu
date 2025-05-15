// import { TextInput, required } from "react-admin";
// import { useWatch, useFormContext } from "react-hook-form";
// import { useState } from "react";

// export const CompanyImageUpload = () => {
//     const { setValue } = useFormContext();
//     const images = useWatch({ name: "images" }) || [];
//     const [previews, setPreviews] = useState<string[]>([]);

//     const handleImagesChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const files = Array.from(event.target.files || []);
//         const base64Images = await Promise.all(
//             files.map(file => {
//                 return new Promise<string>((resolve, reject) => {
//                     const reader = new FileReader();
//                     reader.onloadend = () => resolve(reader.result as string);
//                     reader.onerror = reject;
//                     reader.readAsDataURL(file);
//                 });
//             })
//         );

//         const imageObjects = base64Images.map(base64 => ({ imageBase64: base64 }));
//         setValue("images", imageObjects);
//         setPreviews(base64Images);
//     };

//     return (
//         <>
//             <label>Firma Fotoğrafları</label>
//             <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: 10 }}>
//                 {previews.map((src, index) => (
//                     <img
//                         key={index}
//                         src={src}
//                         alt={`Preview ${index}`}
//                         style={{ maxWidth: 150, maxHeight: 100, borderRadius: 8 }}
//                     />
//                 ))}
//             </div>
//             <TextInput source="images" style={{ display: "none" }} />
//         </>
//     );
// };
