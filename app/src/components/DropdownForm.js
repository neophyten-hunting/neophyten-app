import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from "react-hook-form";
import DropDownPicker from 'react-native-dropdown-picker';

const DropdownForm = ({ labelText, name, control, rules, errors, errorMsg, defaultValue, disabled }) => {
  return (
    <View style={styles.inlineForm} >
      <Text style={styles.labelStyle}>{labelText}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ onChange, onBlur, value }) => (
          <DropDownPicker
            items={[
              { label: 'Erstellt', value: 'Created', hidden: true },
              { label: 'In Bearbeitung', value: 'WorkInProgress' },
              { label: 'Erledigt', value: 'Done' },
            ]}
            defaultValue={defaultValue}
            containerStyle={{ height: 40, width: 150 }}
            style={{ backgroundColor: 'white' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: 'white' }}
            onChangeItem={onChange}
            onBlur={onBlur}
            value={value}
            disabled={disabled}
            text="Test"
          />
        )}
      />
      {errors[name] && <Text style={styles.errorTextStyle}>{errorMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inlineForm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  labelStyle: {
    fontSize: 18,
    marginRight: 10,
    minWidth: 120,
    color: 'rgba(70, 70, 70, 1)',
  },
  errorTextStyle: {
    fontSize: 16,
    color: 'red',
    marginTop: 3,
  }
});

export default DropdownForm;