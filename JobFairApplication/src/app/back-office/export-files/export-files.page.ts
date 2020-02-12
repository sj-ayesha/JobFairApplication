import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ExcelDto } from 'src/app/model/ExcelDto';
import { DownloadDto } from 'src/app/model/DownloadDto';

@Component({
  selector: 'app-export-files',
  templateUrl: './export-files.page.html',
  styleUrls: ['./export-files.page.scss'],
})
export class ExportFilesPage implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }


  private blobToFile(theBlob: Blob, fileName: string): File {
    const file: any = theBlob;
    file.name = fileName;
    return theBlob as File;
  }

  downloadExcel() {
    this.apiService.getCandidateDetailsExcel().subscribe((res: DownloadDto) => {
      let downloadFile: File;
      const byteCharacters = atob(res.file);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/octet-stream' });
      const fileName = res.name;

      // For Edge
      if (window.navigator && window.navigator.msSaveBlob) {
        downloadFile = this.blobToFile(blob, fileName);
      } else {
        const arrayOfBlob = new Array<Blob>();
        arrayOfBlob.push(blob);
        downloadFile = new File(arrayOfBlob, fileName);
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = res.name;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

    },
      (err) => console.log('err', err));

  }

}
