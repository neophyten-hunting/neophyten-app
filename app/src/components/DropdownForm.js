import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller } from "react-hook-form";
import { FontAwesome5 } from '@expo/vector-icons';

const DropdownForm = ({ labelText, name, control, rules, errors, errorMsg, defaultValue, items, disabled }) => {
  const [selectedValue, setSelectedValue] = useState(items.find(e => e.value === defaultValue));
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <View style={styles.inlineForm} >
        <Text style={styles.labelStyle}>{labelText}</Text>
        <TouchableOpacity
          style={styles.valueStyle}
          onPress={() => setVisible(!visible)}>
          <Text style={styles.valueTextStyle}>{selectedValue.label}</Text>
        </TouchableOpacity>
      </View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ onChange, onBlur, value }) => (
          <View style={visible ? null : { height: 0 }}>
            {
              items.map(e => {
                var iconName = e.value === selectedValue.value ? 'check-circle' : 'circle';
                return (
                  <TouchableOpacity
                    style={styles.selectStyle}
                    onPress={() => { onChange(e.value); setSelectedValue(e); setVisible(!visible) }}
                    key={e.value}>
                    <View style={styles.itemWrapperStyle}>
                      <FontAwesome5 name={iconName} style={styles.iconStyle} />
                      <Text style={styles.selectTextStyle}>{e.label}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            }
          </View>
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
    zIndex: 50,
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
  },
  selectStyle: {
    backgroundColor: '#414347',
  },
  selectTextStyle: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 18,
    color: 'white',
    fontWeight: '300',
  },
  iconStyle: {
    color: 'white',
    fontSize: 18,
  },
  itemWrapperStyle: {
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueStyle: {
    width: '100%'
  },
  valueTextStyle: {
    fontSize: 18,
    color: 'green'
  }
});

export default DropdownForm;