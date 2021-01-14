import { Button, majorScale, Pane, Table, TextInput } from 'evergreen-ui';
import React, { useEffect ,useState } from 'react';

// Components
import { TemplateKeyModel } from '../../../models/TemplateModel';

interface IProps {
  onSave: (parameters: TemplateKeyModel[]) => void,
  parameters: TemplateKeyModel[],
};

type Indexable = { [key: string]: any };

// tslint:disable-next-line: max-func-body-length
const TemplateMappingTable = ({ parameters, onSave }: IProps) => {
  const [parametersLabelBuffer, setParametersLabelBuffer] = useState({});
  const [parametersPlaceHolderBuffer, setParametersPlaceHolderBuffer] = useState({});

  useEffect(() => {
    if (parameters) {
      const newLabelBuffer = parameters.reduce((prev, curr) => {
        (prev as Indexable)[curr.key] = curr.label;

        return prev;
      }, {});
      setParametersLabelBuffer(newLabelBuffer);

      const newPlaceHolderBuffer = parameters.reduce((prev, curr) => {
        (prev as Indexable)[curr.key] = curr.placeHolder;

        return prev;
      }, {});
      setParametersPlaceHolderBuffer(newPlaceHolderBuffer);
    }
  }, [parameters]);

  const handleLabelChange = (key: string, value: string) => {
    setParametersLabelBuffer({
      ...parametersLabelBuffer,
      [key]: value,
    });
  };

  const handlePlaceHolderChange = (key: string, value: string) => {
    setParametersPlaceHolderBuffer({
      ...parametersPlaceHolderBuffer,
      [key]: value,
    });
  };

  const getLabelValue = (key: string): string => (
    (parametersLabelBuffer as Indexable)[key] as string
  );

  const getPlaceHolderValue = (key: string): string => (
    (parametersPlaceHolderBuffer as Indexable)[key] as string
  );

  const handleSaveClick = () => {
    const updatedPrameters = parameters.map(parameter => {
      const label = (parametersLabelBuffer as Indexable)[parameter.key];
      const placeHolder = (parametersPlaceHolderBuffer as Indexable)[parameter.key];

      return {
        ...parameter,
        label,
        placeHolder
      }
    });
    console.log('updatedPrameters', updatedPrameters)
    onSave(updatedPrameters);
  };

  return (
    <>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Key</Table.TextHeaderCell>
          <Table.TextHeaderCell>Data Type</Table.TextHeaderCell>
          <Table.TextHeaderCell>Label</Table.TextHeaderCell>
          <Table.TextHeaderCell>Place Holder</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {parameters.map(parameter => (
            <Table.Row key={parameter.key} >
              <Table.TextCell textProps={{ fontWeight: 600 }}>{parameter.key}</Table.TextCell>
              <Table.TextCell>{parameter.keyType.toString()}</Table.TextCell>
              <Table.TextCell >
                <TextInput
                  maxWidth="100%"
                  marginRight={majorScale(1)}
                  onChange={(evt: React.FormEvent<HTMLInputElement>) => {
                    handleLabelChange(parameter.key, evt.currentTarget.value);
                  }}
                  value={getLabelValue(parameter.key) || ''}
                />
              </Table.TextCell>
              <Table.TextCell >
                <TextInput
                  maxWidth="100%"
                  marginRight={majorScale(1)}
                  onChange={(evt: React.FormEvent<HTMLInputElement>) => {
                    handlePlaceHolderChange(parameter.key, evt.currentTarget.value);
                  }}
                  value={getPlaceHolderValue(parameter.key) || ''}
                />
              </Table.TextCell>
            </Table.Row>
          ))}
          
        </Table.Body>
      </Table>
      <Pane marginTop={majorScale(2)} display="flex" flexDirection="row-reverse">
        <Button appearance="primary" intent="success" onClick={handleSaveClick}>Save Mapping</Button>
      </Pane>
    </>
  );
};

export default TemplateMappingTable;