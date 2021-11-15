import React, { Component } from 'react'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { Label } from '@fluentui/react/lib/Label';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { useState , useRef} from 'react';
import { registerDefaultFontFaces } from '@fluentui/style-utilities';
import { Image, IImageProps, ImageFit } from '@fluentui/react/lib/Image';


const qrcode = require('qrcode');
const stackTokens = { childrenGap: 40 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const imageProps: IImageProps = {
  imageFit: ImageFit.center,
  width: 150,
  height: 150,
  // Show a border around the image (just for demonstration purposes)
  styles: props => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
};

/*
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};
*/
//const Eventbind = props => {
//    const {guid, deeplink} = props


function  DeeplinkControl() {

    function deeplinkClick()
  {
     // alert('Button Clicked');
     
      console.log(guid)
      

  }
  function copytoClipboard()
  {
      //alert('Button Clicked');
      deeplinkref.current.select();
    document.execCommand('copy');
      

  }

  
    const [guid, setGuid] = useState('')
    const [instance,setInstance] = useState('')
    const [q,setQ] = useState('')
  
    const deeplinkref = useRef(null);
    
    function instanceSet(e)
    {
      setInstance (e.target.value);
       setUrl(e.target.value+guid);
      }

    function guidSet(e)
    {
      setGuid (e.target.value); 
      setUrl(instance+e.target.value);
    }

    function setUrl(url)
      {
      
        qrcode.toDataURL(url).then((result : string) => {
        setQ(result);
      }) ;
  }
    //<PrimaryButton text = "Generate Deeplink" onClick = {deeplinkClick} ></PrimaryButton>
    //<PrimaryButton text = "Copy" onClick = {copyClick}></PrimaryButton>
    //<PrimaryButton  onClick={() =>  navigator.clipboard.writeText('Copy this text to clipboard')}>Copy</PrimaryButton>
    return (
        
        
        <div>
        
        <Stack tokens={stackTokens} styles={stackStyles}>
            <TextField label = "Client Instance" onChange = {instanceSet}  />

            <TextField label = "The guide id" onChange = {guidSet}  />
        
            <TextField label = "Deeplink" ref = {deeplinkref} readOnly value = {instance+guid}/>
            <TextField label = "code" value = {q} />
            <PrimaryButton  onClick={copytoClipboard}>Copy</PrimaryButton>
            <Label>Scan the QR Code</Label>
            <Image
        {...imageProps}
        src={q}
        alt='Example of the image fit value "center" on an image larger than the frame.'
      />
        
        </Stack>
       
        </div>
    
        
    )
}

export default DeeplinkControl

    

  
