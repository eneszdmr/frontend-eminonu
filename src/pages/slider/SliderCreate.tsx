import { Create, SimpleForm, useNotify, useRedirect, useRefresh } from "react-admin";
import { SliderForm } from "./SliderForm";


const SliderCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const handleSuccess = () => {
        notify("Slider başarıyla eklendi", { type: "success" });
        refresh();
        redirect("/sliders");
    };

    return (
        <Create mutationOptions={{ onSuccess: handleSuccess }}>
            <SimpleForm>
                <SliderForm />
            </SimpleForm>
        </Create>
    );
};


export default SliderCreate;
