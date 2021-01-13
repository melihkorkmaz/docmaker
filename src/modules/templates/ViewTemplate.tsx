import { Heading, majorScale } from 'evergreen-ui';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Card from '../../components/Card';
import PageTitle from '../../components/PageTitle';
import TemplateMappingTable from './components/TemplateMappingTable';

import TemplateModel, { TemplateKeyModel } from '../../models/TemplateModel';
import { templateOperations, templateSelectors } from '../../store/template';
import TemplateForm from './components/TemplateForm';

// tslint:disable-next-line: max-func-body-length
const ViewTemplate = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const template = useSelector(templateSelectors.getCurrentTemplate);

  useEffect(() => {
    dispatch(templateOperations.getTemplate(id));
  }, [dispatch, id]);

  const handleMappingUpdate = (updatedParameters: TemplateKeyModel[]) => {
    const updatedTemplate = new TemplateModel({
      ...template,
      templateParameters: updatedParameters
    });

    dispatch(templateOperations.updateTemplate(updatedTemplate));
  };

  const handleSave = (buffer: TemplateModel) => {
    const updatedTemplate = new TemplateModel({
      ...template,
      ...buffer,
    });
    
    dispatch(templateOperations.updateTemplate(updatedTemplate));
  };

  if (!template) {
    return null;
  }

  return (
    <>
      <PageTitle>
        {template.name}
      </PageTitle>
      <Card marginBottom={majorScale(4)}>
        <>
          <Heading size={500} fontWeight={600} marginBottom={majorScale(2)}>Details</Heading>
          <TemplateForm onSave={handleSave} template={template} />
        </>
      </Card>
      <Card>
        <>
          <Heading size={500} fontWeight={600} marginBottom={majorScale(2)}>Mapping</Heading>
          {template && template.templateParameters && 
            <TemplateMappingTable parameters={template.templateParameters} onSave={handleMappingUpdate} /> 
          }
        </>
      </Card>
    </>
  );
};

export default ViewTemplate;