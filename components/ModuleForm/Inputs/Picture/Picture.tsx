import React, { useState, useRef, Fragment, useEffect } from 'react'

import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import { canvasPreview } from './Crop/canvasPreview'
import { useDebounceEffect } from './Crop/useDebounceEffect'
import 'react-image-crop/dist/ReactCrop.css'
import { Box, Input, Button, SxProps, Theme, Dialog, DialogContent, DialogTitle, Typography, Slider, DialogActions, Stack, FormControl, FormHelperText, Avatar, InputLabel } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import { FormDataField } from '@/types/form/form'
import useInputController from '../InputController'
import { useModuleFormContext } from '../../context'

const inputStyle: SxProps<Theme> = {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
}



const aspectRatio = 1;
const cropWidth = 90;
const cropHeight = 90;

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: 'px',
                width: cropWidth,
                height: cropHeight,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default function PictureField({ dataField }: { dataField: FormDataField }) {

    const { value, error, disabled } = useInputController({ dataField })
    const formCtx = useModuleFormContext()
    const [open, setOpen] = useState(false)
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop | undefined>({
        width: 50,
        height: 50,
        unit: 'px',
        x: 0,
        y: 0,
    })
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale, setScale] = useState(50)
    const [rotate, setRotate] = useState(0)
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (value && value instanceof Blob) {
            const url = URL.createObjectURL(value)
            setPreviewUrl(url)
            return () => URL.revokeObjectURL(url)
        }
        if (typeof value === 'string' && value) {
            setPreviewUrl(value)
            return
        }
        setPreviewUrl(undefined)
    }, [value])

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setOpen(true)
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    function onDropFile(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault()
        const files = e.dataTransfer?.files
        if (files && files.length > 0) {
            setOpen(true)
            setCrop(undefined)
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(files[0])
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget
        setCrop(centerAspectCrop(width, height, aspectRatio))
    }

    async function onDownloadCropClick() {
        const image = imgRef.current
        const previewCanvas = previewCanvasRef.current
        if (!image || !previewCanvas || !completedCrop) {
            throw new Error('Crop canvas does not exist')
        }

        // The preview canvas already contains the cropped result rendered by canvasPreview.
        const blob = await new Promise<Blob>((resolve, reject) => {
            previewCanvas.toBlob((b) => {
                if (b) return resolve(b)
                reject(new Error('Failed to create blob from canvas'))
            }, 'image/png')
        })

        return blob;
    }

    const uploadPicture = async () => {
        const blob = await onDownloadCropClick();
        formCtx.setFormValue(prev => prev.map(input => input.field === dataField.field ? { ...input, value: blob, error: '' } : input));
        setOpen(false);
    }



    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    (scale + 50) * 0.01,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )

    return (
        <Stack gap={2}>
            <Stack gap={2}>
                <Stack>
                    <Typography variant='h6'>{dataField.inputConfig.picture?.title}</Typography>
                    <Typography variant='body1'>{dataField.inputConfig.picture?.description}</Typography>
                </Stack>
                {!previewUrl && <InputLabel
                    htmlFor={`file-input-${dataField.field}`}
                    sx={{
                        width: '100%',
                        height: 200,
                        border: '2px dashed #e0e0e0 ',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: 'primary.main',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                            border: '2px dashed white ',
                        },
                    }}
                    onDragOver={(e: React.DragEvent<HTMLLabelElement>) => e.preventDefault()}
                    onDrop={onDropFile}
                >
                    <Stack gap={1}>
                        <Stack direction='row' gap={1} alignItems={'center'} justifyContent={'center'}>
                            <CloudUpload />
                            <Typography>{previewUrl ? 'Actualizar Imagen' : 'Subir Imagen'}</Typography>
                        </Stack>
                        <Typography
                            variant='body2'
                            sx={{ textWrap: 'wrap', width: { xs: '100%', md: 'auto' } }}
                            textAlign={'center'}
                            >
                            {dataField.inputConfig.picture?.suggestion}
                        </Typography>
                    </Stack>
                </InputLabel>}
                {previewUrl && <Avatar
                    variant='rounded'
                    src={previewUrl}
                    sx={{ width: cropWidth, height: cropHeight }}
                    onClick={() => setOpen(true)}
                />}
            </Stack>
            <FormControl fullWidth error={!!error} disabled={disabled}>
                <Button
                    component='label'
                    variant="contained"
                    startIcon={<CloudUpload />}
                    role={undefined}
                    tabIndex={-1}
                    disabled={disabled}
                >
                    {previewUrl ? 'Actualizar Imagen' : 'Subir Imagen'}
                    <Input
                        id={`file-input-${dataField.field}`}
                        type="file"
                        sx={inputStyle}
                        inputProps={{ accept: 'image/*' }}
                        onClick={(e: any) => { e.target.value = ''; }}
                        onChange={onSelectFile}
                        disabled={disabled}

                    />
                </Button>

                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{previewUrl ? 'Actualizar Imagen' : 'Subir Imagen'}</DialogTitle>
                <DialogContent>
                    <Stack gap={2}>
                        {!!imgSrc && (
                            <ReactCrop
                                crop={crop}
                                onChange={(crop) => setCrop(crop)}
                                onComplete={(crop) => setCompletedCrop(crop)}
                                aspect={aspectRatio}

                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imgSrc}
                                    height={500}
                                    width={500}
                                    style={{
                                        overflow: 'scroll',
                                        objectFit: 'contain',
                                        transform: `scale(${(scale + 50) * 0.01}) rotate(${rotate}deg)`,
                                    }}
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        )}

                        {/* Hidden canvas where the cropped preview is rendered */}
                        <canvas
                            ref={previewCanvasRef}
                            width={500}
                            height={500}
                            style={{ display: 'none' }}
                        />

                        <Box>
                            <Typography>Escala: {scale - 50}</Typography>
                            <Slider
                                value={scale}
                                onChange={(e, value) => setScale(value)}
                                step={1}
                                disabled={!imgSrc || disabled}
                            />
                            <Typography>Rotación: {rotate}°</Typography>
                            <Slider
                                value={rotate}
                                onChange={(e, value) => setRotate(value)}
                                step={1}
                                disabled={!imgSrc || disabled}
                                min={-180}
                                max={180}
                            />
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={uploadPicture} disabled={!imgSrc || disabled}>
                        {previewUrl ? 'Actualizar Imagen' : 'Subir Imagen'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack >
    )
}