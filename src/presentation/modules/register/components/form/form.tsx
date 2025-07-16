'use client'

import { useState } from 'react'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/presentation/external/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/presentation/external/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/presentation/external/components/ui/select'
import { cn } from '@/presentation/external/lib/utils'
import { Input } from '@/presentation/shared/components/form/input/input'
import { Check } from 'lucide-react'

import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from '@/presentation/external/components/ui/calendar'

export function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    birthDate: undefined as Date | undefined,
    cpf: '',
    mentorField: [] as string[],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    setFormData(prev => ({ ...prev, cpf: value }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = 'Campo obrigatório.'
    if (!formData.email) newErrors.email = 'Campo obrigatório.'
    if (!formData.password) newErrors.password = 'Campo obrigatório.'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem.'
    if (formData.role === 'student') {
      if (!formData.birthDate) newErrors.birthDate = 'Informe a data de nascimento.'
      if (!formData.cpf) newErrors.cpf = 'Informe o CPF.'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      console.log('Enviando dados', formData)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSwitchToLogin = () => {
    console.log('Ir para login')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input.Root>
          <Input.Label htmlFor="name">Nome completo</Input.Label>
          <Input.Core
            id="name"
            name="name"
            placeholder="Digite seu nome completo"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="email">E-mail</Input.Label>
          <Input.Core
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="password">Senha</Input.Label>
          <Input.Core
            id="password"
            name="password"
            type="password"
            placeholder="Crie uma senha"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="confirmPassword">Confirmar senha</Input.Label>
          <Input.Core
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="cpf">CPF</Input.Label>
          <Input.Core
            id="cpf"
            name="cpf"
            placeholder="000.000.000-00"
            maxLength={14}
            value={formData.cpf}
            onChange={handleCPFChange}
          />
          {errors.cpf && <p className="text-sm text-red-600">{errors.cpf}</p>}
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="role">Tipo de usuário</Input.Label>
          <Select value={formData.role}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, role: value }))
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione seu tipo" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white border border-gray-200 shadow-md rounded-md">
              <SelectItem value="student">Estudante</SelectItem>
              <SelectItem value="mentor">Mentor</SelectItem>
            </SelectContent>
          </Select>
        </Input.Root>

        {formData.role === 'student' && (
          <>
            <Input.Root>
              <Input.Label htmlFor="birthDate">Data de nascimento</Input.Label>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full text-left font-normal border border-gray-300 px-3 py-2 rounded-md text-sm flex items-center justify-between"
                  >
                    {formData.birthDate ? format(formData.birthDate, "dd/MM/yyyy") : <span className="text-gray-400">Selecione a data</span>}
                    <CalendarIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.birthDate}
                    onSelect={(date) => {
                      setFormData((prev) => ({ ...prev, birthDate: date ?? undefined }))
                    }}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>

              {errors.birthDate && <p className="text-sm text-red-600">{errors.birthDate}</p>}
            </Input.Root>



          </>
        )}

        {formData.role === 'mentor' && (
          <Input.Root>
            <Input.Label>Áreas de atuação (máx. 3)</Input.Label>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "w-full min-h-[44px] px-3 py-2 border border-gray-300 rounded-md text-sm text-left",
                    "flex flex-wrap items-start gap-1",
                    "hover:border-[#5f2eea] focus:outline-none focus:ring-2 focus:ring-[#5f2eea]",
                    formData.mentorField.length === 0 && "text-gray-400"
                  )}
                >
                  {formData.mentorField.length > 0
                    ? formData.mentorField.join(', ')
                    : "Selecione até 3 áreas"}
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0 bg-white shadow-md rounded-md z-50">

                <Command>
                  <CommandInput placeholder="Buscar área..." className="border-b" />
                  <CommandEmpty>Nenhuma área encontrada.</CommandEmpty>
                  <CommandList>
                    {["Educação", "Finanças", "Tecnologia", "Saúde", "Marketing", "Vendas"].map((area) => {
                      const isSelected = formData.mentorField.includes(area)
                      return (
                        <CommandItem
                          key={area}
                          onSelect={() => {
                            setFormData((prev) => {
                              const alreadySelected = prev.mentorField.includes(area)
                              if (alreadySelected) {
                                return {
                                  ...prev,
                                  mentorField: prev.mentorField.filter((a) => a !== area),
                                }
                              }
                              if (prev.mentorField.length >= 3) return prev
                              return {
                                ...prev,
                                mentorField: [...prev.mentorField, area],
                              }
                            })
                          }}
                          className="flex justify-between border-none"
                        >
                          {area}
                          {isSelected && <Check className="w-4 h-4 text-primary" />}
                        </CommandItem>
                      )
                    })}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {formData.mentorField.length >= 3 && (
              <p className="text-xs text-red-500 mt-2">Máximo de 3 áreas selecionadas.</p>
            )}
          </Input.Root>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 text-white text-sm font-medium bg-[#5f2eea] rounded-md hover:bg-[#5f2eea]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Criando conta...' : 'Criar conta'}
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-neutral-700">
          Já possui uma conta?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-[#5f2eea] hover:text-[#5f2eea]/80 transition-colors"
          >
            Faça login
          </button>
        </p>
      </div>
    </form>
  )
}
