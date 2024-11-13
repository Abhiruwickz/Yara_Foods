import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { Real_time_database } from '../../firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import * as Sharing from 'expo-sharing';

const ProductExportPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    const productsRef = ref(Real_time_database, 'products');

    const fetchProducts = () => {
      onValue(productsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const productList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setProducts(productList);
        } else {
          setProducts([]);
        }
        setLoading(false);
      });
    };

    fetchProducts();
    return () => {};
  }, []);

  // Filter products by selected date range
  const filteredProducts = products.filter(product => {
    const productDate = new Date(product.date);
    return productDate >= startDate && productDate <= endDate;
  });

  // Export filtered products to Excel file and share
  const exportToExcel = async () => {
    if (filteredProducts.length === 0) {
      Alert.alert("No products found in the selected date range.");
      return;
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(filteredProducts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

      // Write the workbook to a base64 string
      const excelBase64 = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
      const fileUri = `${FileSystem.documentDirectory}Selected-Products.xlsx`;

      // Write the base64 string to a file as binary
      await FileSystem.writeAsStringAsync(fileUri, excelBase64, {
        encoding: FileSystem.EncodingType.Base64
      });

      // Share the file
      await Sharing.shareAsync(fileUri, {
        UTI: 'com.microsoft.excel.xlsx',
        dialogTitle: 'Export Products to Google Drive',
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      Alert.alert("File shared!", "You can now check Google Drive or your chosen app to see the uploaded file.");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      Alert.alert("Failed to export to Excel. Please try again.");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white items-center">
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View className="p-4 mt-20">
          <View className="mb-4">
            <Text className="text-lg font-bold text-center">
              Download the list of products between the selected date range
            </Text>
            <View className="flex flex-row mt-10">
              <TouchableOpacity 
                onPress={() => setShowStartDatePicker(true)} 
                className="bg-yellow-400 py-2 px-4 rounded mb-2 mr-4 w-[151px]"
              >
                <Text className="text-white text-center font-semibold">Select Start Date</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => setShowEndDatePicker(true)} 
                className="bg-yellow-400 py-2 px-4 rounded mb-2 w-[151px]"
              >
                <Text className="text-white text-center font-semibold">Select End Date</Text>
              </TouchableOpacity>
            </View>

            <View className="mb-4 mt-6 border w-[320px] h-[100px] ">
              <Text className="text-lg text-center mt-4">
                Selected Start Date: {startDate.toLocaleDateString()}
              </Text>
              <Text className="text-lg text-center">
                Selected End Date: {endDate.toLocaleDateString()}
              </Text>
            </View>

            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowStartDatePicker(false);
                  if (selectedDate) setStartDate(selectedDate);
                }}
              />
            )}
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowEndDatePicker(false);
                  if (selectedDate) setEndDate(selectedDate);
                }}
              />
            )}
          </View>

          {/* Export Button */}
          <TouchableOpacity 
            onPress={exportToExcel} 
            className="bg-green-500 rounded-lg w-[300px] h-[50px] items-center justify-center ml-3 mt-5 "
          >
            <Text className="text-white text-center font-semibold text-lg">Download as Excel file</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductExportPage;
