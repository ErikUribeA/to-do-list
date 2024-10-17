import React, { useState } from 'react'
import { X } from 'lucide-react'
import styled from 'styled-components'

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`

const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 91.666667%;
  max-width: 42rem;
  transform: all 0.3s ease-in-out;

  @media (min-width: 768px) {
    width: 66.666667%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }

  @media (min-width: 1280px) {
    width: 33.333333%;
  }

  .dark & {
    background-color: #1f2937;
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;

  .dark & {
    border-color: #374151;
  }
`

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;

  .dark & {
    color: white;
  }
`

const CloseButton = styled.button`
  color: #6b7280;
  transition: color 0.2s;

  &:hover {
    color: #374151;
  }

  .dark & {
    color: #9ca3af;
    &:hover {
      color: #e5e7eb;
    }
  }
`

const Form = styled.form`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;

  .dark & {
    color: #d1d5db;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  .dark & {
    background-color: #374151;
    border-color: #4b5563;
    color: white;
  }
`

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s, border-color 0.2s;

  &:focus {
    outline: none;
  }
`

const CancelButton = styled(Button)`
  border: 1px solid #d1d5db;
  color: #374151;

  &:hover {
    background-color: #f3f4f6;
  }

  .dark & {
    border-color: #4b5563;
    color: #d1d5db;

    &:hover {
      background-color: #374151;
    }
  }
`

const SaveButton = styled(Button)`
  background-color: #2563eb;
  color: white;
  border: 1px solid transparent;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #1d4ed8;
  }
`

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    initialData?: { name: string; description: string; date: string }
    onSave: (data: { name: string; description: string; date: string }) => void
}

export default function Modal({ isOpen, onClose, title, initialData, onSave }: ModalProps) {
    const [formData, setFormData] = useState(initialData || { name: '', description: '', date: '' })

    if (!isOpen) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
        onClose()
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    {title && <ModalTitle>{title}</ModalTitle>}
                    <CloseButton onClick={onClose}>
                        <X className="h-6 w-6" />
                    </CloseButton>
                </ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Task Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter task name"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <TextArea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter task description"
                            required
                            rows={3}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <ButtonGroup>
                        <CancelButton type="button" onClick={onClose}>
                            Cancel
                        </CancelButton>
                        <SaveButton type="submit">
                            Save
                        </SaveButton>
                    </ButtonGroup>
                </Form>
            </ModalContent>
        </ModalOverlay>
    )
}