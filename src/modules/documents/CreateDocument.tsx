import { Button, FormField, majorScale, Pane, Select, TextInputField } from 'evergreen-ui';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Card from '../../components/Card';
import PageTitle from '../../components/PageTitle';

import { documentOperations } from '../../store/document';
import { templateOperations, templateSelectors } from '../../store/template';

import DocumentModel from '../../models/DocumentModel';

const CreateDocument = () => {
  const { control, errors, handleSubmit } = useForm<DocumentModel>();
  const dispatch = useDispatch();
  const templates = useSelector(templateSelectors.getTemplates);


  useEffect(() =>{
    dispatch(templateOperations.getTemplates());
  }, [dispatch]);

  const onSubmit = (data: any) => {
    if (!templates) {
      return;
    }

    const document = new DocumentModel(data);
    const selectedTemplate = templates.find(template => template._id === data.template);
    
    if (!selectedTemplate) {
      return;
    }

    document.template = selectedTemplate;

    dispatch(documentOperations.createNewDocument(document));
  };

  return (
    <>
      <PageTitle>
        Create New Document
      </PageTitle>

      <Card paddingTop={24}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={props => (
              <TextInputField
                label="Document Name *"
                placeholder="Enter a template name"
                name="name"
                value={props.value}
                onChange={props.onChange}
                isInvalid={!!errors.name}
                validationMessage={errors.name ? 'Please enter a template name!' : null}
              />
            )}
          />

          {templates && 
            <FormField label="Template *" marginBottom={majorScale(3)}>
              <Controller
                name="template"
                control={control}
                rules={{ required: true }}
                defaultValue={templates[0]._id}
                render={props =>
                  <Select width="100%" value={props.value} onChange={props.onChange}>
                    {templates.map(template => (
                      // tslint:disable-next-line: react-a11y-role-has-required-aria-props
                      <option key={template._id} value={template._id}>{template.name}</option>
                    ))}
                  </Select>
                }
              />
            </FormField>
          }
          <Pane display="flex" flexDirection="row-reverse">
            <Button type="submit" intent="success" appearance="primary" height={majorScale(5)} paddingX={majorScale(5)}>
              Save
            </Button>
          </Pane>
        </form>
      </Card>
    </>
  );
};

export default CreateDocument;