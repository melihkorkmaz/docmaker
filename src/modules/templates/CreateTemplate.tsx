import { useDispatch } from 'react-redux';

// Components
import Card from '../../components/Card';
import PageTitle from '../../components/PageTitle';
import TemplateForm from './TemplateForm';

import { templateOperations } from '../../store/template';

import { ITemplateModel } from '../../models/TemplateModel';

export default () => {
  const dispatch = useDispatch();
  
  const handleSave = (data: ITemplateModel) => {
    dispatch(templateOperations.createTemplate(data));
  }
  
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