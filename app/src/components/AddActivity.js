import React, { useEffect } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import TextForm from './TextForm';
import workStepFrom from '../config/workStepForm';
import DropdownForm from './DropdownForm';

const AddActivity = ({ isVisible, setIsVisible, onSubmit, isCreating }) => {
  const { control, handleSubmit, errors } = useForm();

  useEffect(() => {
    // wihtout this, the component will not re-render, probably better solution available
  }, [errors])

  const renderFormComponent = () => {
    return workStepFrom.map((formComp, index) => {
      if (formComp.type === 'Text') {
        return <TextForm
          name={formComp.name}
          rules={formComp.rules}
          control={control}
          errors={errors}
          errorMsg={formComp.errorMsg}
          key={index}
          labelText={formComp.label}
          defaultValue={formComp.defaultValue}
          keyboardType={formComp.keyboardType}
          multiline={formComp.multiline}
          useSwitch={formComp.useSwitch}
          placeholder={formComp.placeholder}
          disabled={isCreating}
        />
      }
      else if (formComp.type === 'Switch') {
        return <SwitchForm
          name={formComp.name}
          rules={formComp.rules}
          control={control}
          errors={errors}
          errorMsg={formComp.errorMsg}
          defaultValue={formComp.defaultValue}
          key={index}
          labelText={formComp.label}
          disabled={isCreating}
        />
      }
      else if (formComp.type === 'Dropdown') {
        return <DropdownForm
          name={formComp.name}
          rules={formComp.rules}
          control={control}
          errors={errors}
          errorMsg={formComp.errorMsg}
          defaultValue={formComp.defaultValue}
          key={index}
          labelText={formComp.label}
          items={formComp.items}
          disabled={isCreating}
        />
      }
      else {
        return null;
      }
    })
  }

  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(!isVisible);
        }}
      >
        <View style={styles.fullViewStyle}>
          <ActivityIndicator style={styles.loadingStyle} size="large" color="green" animating={isCreating} />
          <View style={styles.containerStyle}>
            <Text style={styles.titleStyle}>Aktivität hinzufügen</Text>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <KeyboardAvoidingView
                // padding is for ios best, for android it is not the best solution, 
                // but the best available in this context
                behavior={Platform.OS === "ios" ? "padding" : "padding"}
                enabled
              >
                {renderFormComponent()}
              </KeyboardAvoidingView>
            </ScrollView>
            <View style={styles.bottomBar}>
              <TouchableOpacity
                disabled={isCreating}
                color='white'
                title='Hinzufügen'
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.buttonTextStyle}>Hinzufügen</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isCreating}
                color='white'
                title='Abbrechen'
                onPress={() => setIsVisible(false)} >
                <Text style={styles.buttonTextStyle}>Abbrechen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fullViewStyle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: 'rgba(40, 40, 40, 0.5)',
  },
  containerStyle: {
    marginTop: 80,
    marginHorizontal: 15,
    width: '90%',
    maxHeight: '75%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  bottomBar: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    backgroundColor: 'green',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: -1,
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 18,
  },
  titleStyle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
  loadingStyle: {
    position: 'absolute',
    marginTop: 200,
    alignSelf: 'center',
    zIndex: 200,
  },
});

export default AddActivity;