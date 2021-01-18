import { Button, FormField, majorScale, Pane, Select, TextInputField } from 'evergreen-ui';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// Components
import Card from '../../components/Card';
import PageTitle from '../../components/PageTitle';

import { templateOperations } from '../../store/template';

import DocumentModel from '../../models/DocumentModel';

const CreateDocument = () => {
  const { control, errors, handleSubmit } = useForm<DocumentModel>();
  const dispatch = useDispatch();
  // const history = useHistory();
  // const template = useSelector(templateSelectors.getCurrentTemplate);

  // const handleSave = (data: TemplateModel) => {
  //   dispatch(templateOperations.createTemplate(data));
  // };

  // useEffect(() => {
  //   if (template) {
  //     history.push(`/app/templates/view/${template._id}`);
  //   }
  // }, [template, history]);

  useEffect(() =>{
    dispatch(templateOperations.getTemplates());
  }, [dispatch]);

  const onSubmit = () => {
    console.log('here')
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

          <FormField label="Template *" marginBottom={majorScale(3)}>
            <Controller
              name="template"
              control={control}
              rules={{ required: true }}
              render={props =>
                <Select width="100%" value={props.value} onChange={props.onChange}>
                  <option value="en">English</option>
                  <option value="tr">Turkish</option>
                </Select>
              }
            />
          </FormField>


          <Pane display="flex" flexDirection="row-reverse">
            <Button type="submit" intent="success" appearance="primary" height={majorScale(5)} paddingX={majorScale(5)}>
              Save
            </Button>
            {/* {onCancel &&
              <Button height={majorScale(5)} paddingX={majorScale(5)} marginRight={majorScale(2)}>
                Cancel
              </Button>
            } */}
          </Pane>
        </form>
      </Card>
    </>
  );
};

export default CreateDocument;