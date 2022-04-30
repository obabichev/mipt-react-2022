import { ArrayInput } from './ui/ArrayInput'
import { Input } from "./ui/Input"
import tagsSample from "../mock/tags-sample.json";

const requiredFieldValidation = {
    required: 'Required field',
}

export const ProductView = ({ 
    errors, 
    register, 
    onSubmit, 
    images,
    appendImage,
    removeImage,
    sellOptions,
    appendSellOption,
    removeSellOption
}) => {
    return (
        <form onSubmit={onSubmit}>
            <Input 
                label="Title" 
                error={errors.title?.message} 
                {...register('title', {...requiredFieldValidation})} 
            />
            <Input 
                label="Description" 
                error={errors.description?.message} 
                {...register('description', {...requiredFieldValidation})} 
            />

            <b>Images</b>
            <div style={{border: '1px solid black', padding: 10}}>
                <ArrayInput 
                    appendButtonTitle="Add another image" 
                    removeButtonTitle="Remove image"
                    fields={images}
                    onAppendButtonClick={() => appendImage(' ')}
                    onRemoveButtonClick={removeImage}
                >
                    {(index) => <Input 
                        label="Image url" 
                        error={errors && errors.images && errors.images[index]?.message}
                        {...register(
                            `images.${index}`, 
                            {
                                ...requiredFieldValidation,
                                // Initially we put space to this field
                                // Because if we put empty string
                                // fields (in our case images) will be empty array
                                // ' ' !== '', so requiredFieldValidation doesn't work
                                // This is workaround
                                validate: (value) => {
                                    const trimmedValue = value.trim()
                                    if (!trimmedValue) {
                                        return requiredFieldValidation.required
                                    }
                                }
                            }
                        )}
                    />}
                </ArrayInput>
            </div>

            <Input 
                label="isbn-10" 
                error={errors && errors.attributes && errors.attributes['isbn-10']?.message} 
                {...register('attributes.isbn-10', {...requiredFieldValidation})} 
            />
            
            <Input 
                label="isbn-13" 
                error={errors && errors.attributes && errors.attributes['isbn-13']?.message} 
                {...register('attributes.isbn-13', {...requiredFieldValidation})} 
            />
            <Input 
                label="Publisher"
                error={errors.attributes?.publisher?.message} 
                {...register('attributes.publisher', {...requiredFieldValidation})} 
            />
            <Input 
                label="Language"
                error={errors.attributes?.language?.message} 
                {...register('attributes.language', {...requiredFieldValidation})} 
            />
            <Input 
                label="Paperback"
                error={errors.attributes?.paperback?.message} 
                {...register('attributes.paperback', {...requiredFieldValidation})} 
            />
            <Input 
                label="Dimensions"
                error={errors.attributes?.dimensions?.message} 
                {...register('attributes.dimensions', {...requiredFieldValidation})} 
            />
            <Input 
                label="Author"
                error={errors.attributes?.author?.message} 
                {...register('attributes.author', {...requiredFieldValidation})} 
            />

            <ArrayInput 
                appendButtonTitle="Add another sell option" 
                removeButtonTitle="Remove sell option"
                fields={sellOptions}
                onAppendButtonClick={() => appendSellOption({ price: 0, currency: '', type: '' })}
                onRemoveButtonClick={removeSellOption}
            >
                {(index) => (
                    <>
                        <b>Sell option</b>
                        <div style={{border: '1px solid black', padding: 10}}>
                            <Input 
                                type="number"
                                label="Price" 
                                error={errors && errors.sellOptions && errors.sellOptions[index]?.price?.message}
                                {...register(`sellOptions.${index}.price`, {...requiredFieldValidation, valueAsNumber: true})}
                            />
                            <Input 
                                label="Currency" 
                                error={errors && errors.sellOptions && errors.sellOptions[index]?.currency?.message}
                                {...register(`sellOptions.${index}.currency`, {...requiredFieldValidation})}
                            />
                            <Input 
                                label="Type" 
                                error={errors && errors.sellOptions && errors.sellOptions[index]?.type?.message}
                                {...register(`sellOptions.${index}.type`, {...requiredFieldValidation})}
                            />
                        </div>
                    </>
                )}
            </ArrayInput>
            
            <select {...register('tag')} required>
                {tagsSample.map(({key, title}) => <option key={key} value={key}>{title}</option>)}
            </select>

            <input type="submit" value="Submit" />
        </form>
    )
}