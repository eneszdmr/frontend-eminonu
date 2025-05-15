import { Edit, SimpleForm, useNotify, useRecordContext, useRedirect, useRefresh } from "react-admin";
import { SliderForm } from "./SliderForm";


const SliderEdit = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    const record = useRecordContext();



    const handleSuccess = () => {
        notify("resources.sliders.slider_updated", { type: "success" });
        refresh();
        redirect("/sliders");
    };

    return (
        <Edit mutationMode="pessimistic" mutationOptions={{ onSuccess: handleSuccess }}>
             <SimpleForm defaultValues={(record) => ({ ...record })}>
                <SliderForm />
            </SimpleForm>
        </Edit>
    );
};

export default SliderEdit;
