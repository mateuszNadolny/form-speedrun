'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FormInputProps } from '@/types/types';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { formatDate } from '@/lib/time';

const FormInput = ({ input, onComplete }: FormInputProps) => {
  const [value, setValue] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === input.value) {
      onComplete();
      setValue('');
    }
  };

  const renderInput = () => {
    switch (input.type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border-1 p-2 text-xl rounded-xl border-color-teritary bg-color-secondary text-color-light"
            required
          />
        );
      case 'select':
        return (
          <Select
            onValueChange={(e) => {
              setValue(e);
            }}>
            <SelectTrigger className="w-[180px] bg-color-secondary text-color-light">
              <SelectValue placeholder={input.label} />
            </SelectTrigger>
            <SelectContent className="bg-color-secondary text-color-light">
              {input?.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'radio':
        return (
          <RadioGroup
            className="text-color-light"
            onValueChange={(e) => {
              console.log(value);
              setValue(e);
            }}>
            {input?.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'checkbox':
        return (
          <Switch
            checked={value === 'true'}
            onCheckedChange={(e) => setValue(e ? 'true' : 'false')}
          />
        );
      case 'range':
        return (
          <div className="flex flex-row-reverse justify-end items-center gap-6">
            <Label className="block text-4xl font-medium text-color-teritary">
              {value ? value : 0}
            </Label>
            <input
              className="w-[300px]"
              defaultValue={0}
              type="range"
              min={input.min}
              max={input.max}
              value={value ? value : 0}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        );
      case 'date':
        return (
          <>
            <input
              type="date"
              id="date"
              className="p-2 rounded-xl bg-color-secondary text-color-light text-xl w-[400px]"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </>
        );
      case 'time':
        return (
          <>
            <input
              type="time"
              className="p-2 rounded-xl bg-color-secondary text-color-light text-xl w-[400px]"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </>
        );
      default:
        return (
          <input
            type={input.type}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="p-2 rounded-xl bg-color-secondary text-color-light text-xl w-[400px]"
            required
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="w-full">
        <Label className="block text-[24px] lg:text-[48px] font-medium text-color-teritary mb-2">
          {input.label}
        </Label>
        {input.type === 'date' ? (
          <p className="text-[14.83px] lg:text-[18.33px] text-muted-foreground mb-4 select-none">
            To enter:{' '}
            <span className="font-bold select-none">{formatDate(input.value as string)}</span>
          </p>
        ) : (
          <p className="text-[14.83px] lg:text-[18.33px] text-muted-foreground mb-4 select-none">
            To enter: <span className="font-bold select-none">{input.value}</span>
          </p>
        )}
        {renderInput()}
      </div>
      <Button type="submit" className="bg-color-teritary text-color-light text-[18.33px]">
        Submit
      </Button>
    </form>
  );
};

export default FormInput;
