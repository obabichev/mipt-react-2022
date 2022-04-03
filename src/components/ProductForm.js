import { useForm, useFieldArray } from "react-hook-form"
import { ProductView } from "./ProductView";

export const ProductForm = ({defaultValues, onSubmit}) => {
    const { 
        register, 
        handleSubmit, 
        control,
        formState: {
            errors,
        }} = useForm({
            defaultValues
        })

    const { 
        fields: images,
        append: appendImage, 
        remove: removeImage,
    } = useFieldArray({
        control,
        name: 'images', 
    });
        
    
    const { 
        fields: sellOptions,
        append: appendSellOption, 
        remove: removeSellOption,
    } = useFieldArray({
        control,
        name: 'sellOptions', 
    });

    return (
        <ProductView 
            register={register} 
            errors={errors} 
            onSubmit={handleSubmit(onSubmit)}
            images={images}
            appendImage={appendImage}
            removeImage={removeImage}
            sellOptions={sellOptions}
            appendSellOption={appendSellOption}
            removeSellOption={removeSellOption}
        />
    )
}