// import { Injectable } from '@angular/core';
// import { BlobServiceClient, ContainerClient, BlobUploadCommonResponse } from '@azure/storage-blob';
// // import { environmentIdea } from '../envoirments/enviroment';

// @Injectable({
//     providedIn: 'root'
// })
// export class StorageService {
//     private blobServiceClient: BlobServiceClient;

//     constructor() {
//         this.blobServiceClient = new BlobServiceClient();
//     }

//     async uploadImage(containerName: string, blobName: string, file: File): Promise<BlobUploadCommonResponse> {
//         const containerClient: ContainerClient = this.blobServiceClient.getContainerClient(containerName);
//         const blobClient = containerClient.getBlockBlobClient(blobName);

//         const response = await blobClient.uploadData(file, {
//             blobHTTPHeaders: { blobContentType: file.type }
//         });

//         return response;
//     }
// }
