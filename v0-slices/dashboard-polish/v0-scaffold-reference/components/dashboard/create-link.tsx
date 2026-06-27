'use client'

import { createContext, useContext, useState } from 'react'
import { Check, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/dashboard/modal'
import { Field, TextInput, SelectInput } from '@/components/dashboard/form'

type CreateLinkContextValue = { open: () => void }

const CreateLinkContext = createContext<CreateLinkContextValue | undefined>(undefined)

export function CreateLinkProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [created, setCreated] = useState(false)

  const open = () => {
    setCreated(false)
    setIsOpen(true)
  }
  const close = () => setIsOpen(false)

  return (
    <CreateLinkContext.Provider value={{ open }}>
      {children}
      <Modal
        open={isOpen}
        onClose={close}
        title="Create smart link"
        description="Route visitors to the right destination based on device, region, and campaign."
        footer={
          created ? (
            <Button onClick={close}>Done</Button>
          ) : (
            <>
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button onClick={() => setCreated(true)}>
                <Link2 className="size-4" /> Create link
              </Button>
            </>
          )
        }
      >
        {created ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-success-soft text-success">
              <Check className="size-6" />
            </span>
            <p className="text-sm font-semibold">Smart link created</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Your link is live at{' '}
              <span className="font-medium text-foreground">go.acme.com/new-link</span>.
              This is a mocked action ready to wire to your create-link flow.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            <Field label="Link title">
              <TextInput placeholder="Spring Sale Landing" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr]">
              <Field label="Domain">
                <SelectInput defaultValue="go.acme.com">
                  <option>go.acme.com</option>
                  <option>link.acme.io</option>
                </SelectInput>
              </Field>
              <Field label="Slug">
                <TextInput placeholder="spring-sale" />
              </Field>
            </div>
            <Field label="Destination URL">
              <TextInput placeholder="https://shop.acme.com/spring" />
            </Field>
            <Field label="Platform routing">
              <SelectInput defaultValue="Smart (auto)">
                <option>Smart (auto)</option>
                <option>Web only</option>
                <option>iOS / Android app</option>
              </SelectInput>
            </Field>
          </div>
        )}
      </Modal>
    </CreateLinkContext.Provider>
  )
}

export function useCreateLink() {
  const ctx = useContext(CreateLinkContext)
  if (!ctx) throw new Error('useCreateLink must be used within CreateLinkProvider')
  return ctx
}
