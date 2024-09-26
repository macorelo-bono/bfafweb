import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Papa } from 'ngx-papaparse';
import { saveAs } from 'file-saver';

interface UserProfile {
  name: string;
  email: string;
  photoUrl?: string;
}

interface Questionnaire {
  responses: { [key: string]: string };
  timestamp: { seconds: number; nanoseconds: number };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService: AuthService, private papa: Papa) { }

  ngOnInit() { }

    async exportCSV() {
      try {
        const data = await this.authService.fetchUserQuestionnaires();
  
        if (!data) {
          console.error('No data found');
          return;
        }
  
        const { userProfile, questionnaires } = data;
        const formattedData = questionnaires.map((questionnaire: any) => {
          const responseObject: { [key: string]: string } = {};
          for (const [key, value] of Object.entries(questionnaire.responses)) {
            responseObject[key] = String(value); // Ensure the value is a string
          }
  
          return {
            Nome: userProfile?.name ?? '',
            Email: userProfile?.email ?? '',
            Timestamp: new Date(questionnaire.timestamp?.seconds * 1000).toLocaleString(), // Assuming Firestore timestamp
            ...responseObject
          };
        });
  
        // Extract all possible keys from formattedData
        const allKeys = formattedData.reduce((keys, obj) => {
          Object.keys(obj).forEach(key => keys.add(key));
          return keys;
        }, new Set<string>());
  
        // Convert Set to Array and sort it
        const header = Array.from(allKeys).sort();
  
        // Ensure each object contains all keys from the header
        const completeData = formattedData.map(entry => {
          const completeEntry: { [key: string]: string } = {};
          header.forEach(key => {
            completeEntry[key] = (entry as { [key: string]: string })[key] ?? ''; // Add empty string for missing keys
          });
          return completeEntry;
        });
  
        // Transform data to match the structure expected by PapaParse
        const csvData = completeData.map(entry => header.map(key => entry[key]));
  
        // Add headers to the data
        csvData.unshift(header);
  
        const csv = this.papa.unparse(csvData, {
          quotes: false, // Removes quotes from around the fields
          delimiter: ";", // Defines delimiter for CSV
          header: true // Includes headers in the CSV file
        });
  
        const csvWithNewLines = csv.replace(/\r?\n/g, '\r\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'questionnaires.csv');
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'questionnaires.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error exporting CSV:', error);
      }
    }

      /*async exportCSV() {
        try {
          const data = await this.authService.fetchUserQuestionnaires();
      
          if (!data) {
            console.error('No data found');
            return;
          }
      
          const { userProfile, questionnaires } = data;
      
          // Prepare the CSV header
          const header = ['Nome', 'Email', 'Timestamp', ...Object.keys(questionnaires[0]?.['responses'])];
      
          // Prepare the CSV data rows
          const csvData = [];
          for (const questionnaire of questionnaires) {
            const rowData = [
              userProfile?.name ?? '',
              userProfile?.email ?? '',
              new Date(questionnaire['timestamp'].seconds * 1000).toLocaleString()
            ];
            for (const key of Object.keys(questionnaire['responses'])) {
              rowData.push(questionnaire['responses'][key] ?? '');
            }
            csvData.push(rowData);
          }
      
          // Convert the CSV data to a string
          const csv = this.papa.unparse(csvData, {
            delimiter: ";", // Defines delimiter for CSV
            header: true // Includes headers in the CSV file
          });
      
          // Create a Blob object and trigger download
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, 'questionnaires.csv');
        } catch (error) {
          console.error('Error exporting CSV:', error);
        }
      }*/
  }





