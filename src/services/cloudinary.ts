import u from '@/services/Util.js'
import { now } from 'lodash'

// Environment (.env)
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY
const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET // # TODO: Server-Side only!

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}`
const CLOUDINARY_UPLOAD_PRESET = uploadPreset // UNSIGNED

interface FileUploadOptions {
    folder?:string
    generateFileName?:boolean
}

export default {

    sha256(message:string): Promise<string> {
        return new Promise(function (resolve, reject) {
            // encode as UTF-8
            const msgBuffer = new TextEncoder().encode(message);

            // hash the message
            //const hashBuffer = crypto.subtle.digest('SHA-256', msgBuffer);
            crypto.subtle.digest('SHA-256', msgBuffer).then( hashBuffer => {

                // convert ArrayBuffer to Array
                const hashArray = Array.from(new Uint8Array(hashBuffer));

                // convert bytes to hex string
                const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
                return resolve(hashHex);
            })
        })
    },

    async uploadFile(file:File, options:FileUploadOptions):Promise<any> {
        // FormData
        const formData = new FormData();
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        if (options.generateFileName) {
            console.log(file.name)
            formData.append('public_id', u.msAsBase36())
        }
        formData.append('file', file)
        // If omitted, will be placed in root.
        // If non-existing folder, the image will be placed in "uploadFolder" instead.
        if (options.folder) {
            formData.append('folder', options.folder);
        }

        // POST
        const response = await fetch(CLOUDINARY_URL, {
            method: 'post',
            body: formData,
        })

        // Results
        const responseJson = await response.json()
        if (!response.ok) {
            const message = `${responseJson?.error?.message} (${response.status})`;
            throw new Error(message)
        }
        if ("error" in responseJson) {
            throw new Error(responseJson.error.message)
        }
        return responseJson
    },

    async deleteFile(public_id:string) {
        const resource_type = "image"
        const url = `${CLOUDINARY_URL}/${resource_type}/destroy`

        // FormData
        const formData = new FormData();
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('public_id', public_id)

        // POST
        const response = await fetch(url, {
            method: 'post',
            body: formData,
        })
        
        // Results
        const responseJson = await response.json()
        if (!response.ok) {
            const message = `${responseJson?.error?.message} (${response.status})`;
            throw new Error(message)
        }
        if ("error" in responseJson) {
            throw new Error(responseJson.error.message)
        }
        return responseJson
    },

    async tagFile(public_id: string, tag: string) {
        const resource_type = "image"
        const url = `${CLOUDINARY_URL}/${resource_type}/tags`

        // FormData
        const formData = new FormData();
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('public_ids', public_id)
        formData.append('command', 'add')
        formData.append('tag', tag)

        // POST
        const response = await fetch(url, {
            method: 'post',
            body: formData,
        })
        
        // Results
        const responseJson = await response.json()
        if (!response.ok) {
            const message = `${responseJson?.error?.message} (${response.status})`;
            throw new Error(message)
        }
        if ("error" in responseJson) {
            throw new Error(responseJson.error.message)
        }
        return responseJson
    },

    // For mobile and other client-side applications, you must either use unsigned upload or have a server for processing the signature.
    // THIS IS BAD!
    deleteFile1(public_id:string) {
        const timestamp = now()
        const myFormData = `public_id=${public_id}&timestamp=${timestamp}${apiSecret}`
        console.log(myFormData)

        this.sha256(myFormData).then( digest => {
            console.log('public_id',public_id)
            console.log('digest',digest)
            this.deleteFileSig(public_id,digest,timestamp).then( result => {
                console.log('destroy = done',result)
                // ** #TODO this.character.file_cloudinary = null
            })
        })
    },

    deleteFileSig(public_id:string, signature:string, timestamp:number) {
        return new Promise(function (resolve, reject) {
            const resource_type = "image"
            const url = `${CLOUDINARY_URL}/${resource_type}/destroy`

            const formData = new FormData();
            //formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            formData.append('public_id',public_id);
            formData.append('api_key',apiKey);
            formData.append('signature',signature);
            formData.append('timestamp',timestamp.toString());
            //console.log('formData',public_id,formData)

            const request = new XMLHttpRequest();
            request.open('POST', url, true);
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            request.onreadystatechange = () => {
                // File uploaded successfully
                if (request.readyState === 4 && request.status === 200) {
                    const response = JSON.parse(request.responseText);
                    resolve(response);
                }

                // Not succesfull, let find our what happened
                if (request.status !== 200) {
                    const response = JSON.parse(request.responseText);
                    const error = response.error.message;
                    alert('error, status code not 200 ' + error);
                    reject(error);
                }

            };

            request.onerror = (err) => {
                alert('error: ' + err);
                reject(err);
            };

            request.send(formData);
        });
    },

    /*
    generateSignature = function(callback, params_to_sign){
        $.ajax({
            url     : “https://www.my-domain.com/my_generate_signature",
            type    : "GET",
            dataType: "text",
            data    : { data: params_to_sign},
            complete: function() {console.log("complete")},
            success : function(signature, textStatus, xhr) { callback(signature); },
            error   : function(xhr, status, error) { console.log(xhr, status, error); }
        });
    }
    */

}