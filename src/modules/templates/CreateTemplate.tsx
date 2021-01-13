import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Components
import Card from '../../components/Card';
import PageTitle from '../../components/PageTitle';
import TemplateForm from './components/TemplateForm';

import { templateOperations, templateSelectors } from '../../store/template';

import TemplateModel from '../../models/TemplateModel';

const CreateTemplate =  () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const template = useSelector(templateSelectors.getCurrentTemplate);
  
  const handleSave = (data: TemplateModel) => {
    dispatch(templateOperations.createTemplate(data));
  };

  useEffect(() => {
    if (template) {
      history.push(`/app/templates/view/${template._id}`);
    }
  }, [template, history]);
  
  return (
    <>
      <PageTitle>
        Create New Template
      </PageTitle>
      
      <Card paddingTop={24}>
        <TemplateForm onSave={handleSave} />
      </Card>
    </>
  );
};

export default CreateTemplate;