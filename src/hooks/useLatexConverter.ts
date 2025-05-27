
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ConversionOptions {
  mathjax?: boolean;
  standalone?: boolean;
  from?: string;
  to?: string;
}

interface ConversionResult {
  html: string;
  success: boolean;
  error?: string;
}

export function useLatexConverter() {
  const [isConverting, setIsConverting] = useState(false);
  const [cache, setCache] = useState<Map<string, string>>(new Map());

  const convertLatexToHtml = useCallback(async (
    latex: string, 
    options: ConversionOptions = {}
  ): Promise<ConversionResult> => {
    if (!latex.trim()) {
      return { html: '', success: true };
    }

    // Check cache first
    const cacheKey = `${latex}-${JSON.stringify(options)}`;
    if (cache.has(cacheKey)) {
      return { html: cache.get(cacheKey)!, success: true };
    }

    setIsConverting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('convert-latex', {
        body: { latex, options }
      });

      if (error) {
        console.error('Supabase function error:', error);
        return { html: latex, success: false, error: error.message };
      }

      if (data.success) {
        // Cache the result
        cache.set(cacheKey, data.html);
        setCache(new Map(cache));
        return { html: data.html, success: true };
      } else {
        console.error('Conversion failed:', data.error);
        return { html: latex, success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error calling convert-latex function:', error);
      return { html: latex, success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsConverting(false);
    }
  }, [cache]);

  return {
    convertLatexToHtml,
    isConverting,
    clearCache: () => setCache(new Map())
  };
}
