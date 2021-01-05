import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";

import { Button, FilePicker, FormField, majorScale, Pane, Select, TextInputField } from 'evergreen-ui';

import { ITemplateModel } from '../../models/TemplateModel';

interface IProps {
  template?: ITemplateModel,
  onCancel?: (() => void);
  onSave: ((data: ITemplateModel) => void);
}

export default ({ template, onCancel, onSave }: IProps) => {
  const [file, setFile] = useState<File | undefined>();
  const { control, errors, handleSubmit} = useForm<ITemplateModel>();

  const onSubmit = (data: ITemplateModel) => {
    if (file) {
      data.file = file;
    }
    onSave(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        defaultValue={template ? template.name : ''}
        render={props => (
          <TextInputField
            label="Template Name *"
            placeholder="Enter a template name"
            name="name"
            value={props.value}
            onChange={props.onChange}
            isInvalid={!!errors.name}
            validationMessage={errors.name ? 'Please enter a template name!' : null}
          />
        )}
      />
      
      <FormField label="Language *" marginBottom={majorScale(3)}>
        <Controller
          name="language"
          control={control}
          defaultValue={template ? template.name : 'en'}
          rules={{ required: true }}
          render={props =>
            <Select width="100%" value={props.value} onChange={props.onChange}>
              <option value="en">English</option>
              <option value="tr">Turkish</option>
            </Select>
          } // props contains: onChange, onBlur and value
        />
      </FormField>
      
      <FormField label="Select your template document - (.docx format)">
        <FilePicker
          width={250}
          marginBottom={32}
          onChange={(files) => {
            if (files && files.length > 0) {
              setFile(files[0]);
            }
          }}
          placeholder="Select the file here!"
        />
      </FormField>
      <Pane display="flex" flexDirection="row-reverse">
        <Button type="submit" intent="success" appearance="primary" height={majorScale(5)} paddingX={majorScale(5)}>
          Save
        </Button>
        {onCancel && 
          <Button height={majorScale(5)} paddingX={majorScale(5)} marginRight={majorScale(2)}>
            Cancel
          </Button>
        }
      </Pane>
    </form>
  );
}